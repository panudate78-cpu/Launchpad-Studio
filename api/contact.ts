import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import type { IncomingMessage, ServerResponse } from "node:http";

type FunctionRequest = IncomingMessage & { body?: unknown };
type FunctionResponse = ServerResponse & {
  status: (statusCode: number) => FunctionResponse;
  json: (body: unknown) => FunctionResponse;
};

const RECIPIENT_EMAIL = "hello@launchpadstudio.uk";
const MAX_REQUEST_BYTES = 32 * 1024;
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

interface EnquiryPayload {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  type?: unknown;
  message?: unknown;
  website?: unknown;
}

interface Enquiry {
  name: string;
  business: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

function jsonError(response: FunctionResponse, status: number, error: string) {
  return response.status(status).json({ error });
}

function getHeader(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function getJsonBody(body: unknown): EnquiryPayload | null {
  let parsed = body;

  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed) as unknown;
    } catch {
      return null;
    }
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  return parsed as EnquiryPayload;
}

function readText(value: unknown, maxLength: number, required = false): string | null {
  if (value === undefined || value === null) {
    return required ? null : "";
  }
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length > maxLength || (required && !trimmed)) {
    return null;
  }

  // Allow line breaks and tabs in the message, but reject other control characters.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function validateEnquiry(payload: EnquiryPayload): Enquiry | null {
  const name = readText(payload.name, 120, true);
  const business = readText(payload.business, 160);
  const email = readText(payload.email, 254, true);
  const phone = readText(payload.phone, 50);
  const type = readText(payload.type, 120, true);
  const message = readText(payload.message, 5000, true);

  if (
    name === null ||
    business === null ||
    email === null ||
    phone === null ||
    type === null ||
    message === null ||
    !EMAIL_PATTERN.test(email)
  ) {
    return null;
  }

  return { name, business, email, phone, type, message };
}

function isSameOriginRequest(request: FunctionRequest): boolean {
  const origin = getHeader(request.headers.origin);
  const host =
    getHeader(request.headers["x-forwarded-host"]) ??
    getHeader(request.headers.host);

  // Requests without an Origin header are allowed for non-browser clients.
  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host.toLowerCase() === host.split(",")[0].trim().toLowerCase();
  } catch {
    return false;
  }
}

function makeEmailText(enquiry: Enquiry, reference: string): string {
  return [
    "A new website enquiry has been submitted through launchpadstudio.uk.",
    "",
    `Reference: ${reference}`,
    `Name: ${enquiry.name}`,
    `Business: ${enquiry.business || "Not provided"}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    `Website required: ${enquiry.type}`,
    "",
    "Project details:",
    enquiry.message,
  ].join("\n");
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32kb",
    },
  },
  maxDuration: 30,
};

export default async function contact(request: FunctionRequest, response: FunctionResponse) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return jsonError(response, 405, "This endpoint only accepts form submissions.");
  }

  const contentLength = Number(getHeader(request.headers["content-length"]));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonError(response, 413, "Your enquiry is too large. Please shorten the message and try again.");
  }

  const contentType = getHeader(request.headers["content-type"])?.toLowerCase() ?? "";
  if (!/^application\/json(?:\s*;|$)/.test(contentType)) {
    return jsonError(response, 415, "Please submit the enquiry using the contact form.");
  }

  if (!isSameOriginRequest(request)) {
    return jsonError(response, 403, "This form submission could not be verified.");
  }

  const payload = getJsonBody(request.body);
  if (!payload) {
    return jsonError(response, 400, "Please check the form fields and try again.");
  }

  // Quietly discard bot submissions while returning the same response as a valid submission.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return response.status(202).json({ ok: true });
  }

  const enquiry = validateEnquiry(payload);
  if (!enquiry) {
    return jsonError(response, 400, "Please check your name, email address and project details.");
  }

  const smtpHost = process.env.ZOHO_SMTP_HOST?.trim();
  const smtpUser = process.env.ZOHO_SMTP_USER?.trim();
  const smtpPassword = process.env.ZOHO_SMTP_PASSWORD;
  const smtpPort = Number(process.env.ZOHO_SMTP_PORT || 465);

  if (!smtpHost || !smtpUser || !smtpPassword || ![465, 587].includes(smtpPort)) {
    const missingSettings = [
      ...(!smtpHost ? ["ZOHO_SMTP_HOST"] : []),
      ...(!smtpUser ? ["ZOHO_SMTP_USER"] : []),
      ...(!smtpPassword ? ["ZOHO_SMTP_PASSWORD"] : []),
      ...(![465, 587].includes(smtpPort) ? ["ZOHO_SMTP_PORT must be 465 or 587"] : []),
    ];
    // Log setting names only; never log credentials or enquiry contents.
    console.error("[contact] Missing or invalid Zoho SMTP settings", missingSettings);
    return jsonError(
      response,
      503,
      "The enquiry form is temporarily unavailable. Please try again later.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort === 587,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });

  const reference = randomUUID();

  try {
    // Await the SMTP send before responding; Vercel can pause unfinished work
    // after the function returns.
    const result = await transporter.sendMail({
      from: {
        name: "Launchpad Studio",
        address: smtpUser,
      },
      to: RECIPIENT_EMAIL,
      replyTo: enquiry.email,
      subject: `Website enquiry — ${enquiry.business || enquiry.name}`.replace(/[\r\n]+/g, " "),
      text: makeEmailText(enquiry, reference),
    });

    if (result.accepted.length === 0) {
      throw new Error("NoRecipientAccepted");
    }

    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error("[contact] Zoho SMTP send failed", error instanceof Error ? error.name : "UnknownError");
    return jsonError(
      response,
      502,
      "We couldn't send your enquiry just now. Please try again in a moment.",
    );
  } finally {
    transporter.close();
  }
}
