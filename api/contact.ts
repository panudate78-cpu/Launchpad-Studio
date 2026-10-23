import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
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

function makeEmailText(enquiry: Enquiry, enquiryId: string): string {
  return [
    "A new website enquiry has been submitted through launchpadstudio.uk.",
    "",
    `Enquiry reference: ${enquiryId}`,
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

  // Neon integrations on Vercel may expose either DATABASE_URL or POSTGRES_URL.
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || "Launchpad Studio <hello@launchpadstudio.uk>";

  if (!databaseUrl || !resendApiKey) {
    const missingSettings = [
      ...(!databaseUrl ? ["DATABASE_URL or POSTGRES_URL"] : []),
      ...(!resendApiKey ? ["RESEND_API_KEY"] : []),
    ];
    // Log variable names only; never log secret values or enquiry content.
    console.error("[contact] Missing required environment variables", missingSettings);
    return jsonError(
      response,
      503,
      "The enquiry form is temporarily unavailable. Please try again later.",
    );
  }

  const sql = neon(databaseUrl);
  const enquiryId = randomUUID();

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_enquiries (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        business TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL,
        phone TEXT NOT NULL DEFAULT '',
        website_type TEXT NOT NULL,
        message TEXT NOT NULL,
        notification_status TEXT NOT NULL DEFAULT 'pending'
          CHECK (notification_status IN ('pending', 'sent', 'failed')),
        notification_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO contact_enquiries
        (id, name, business, email, phone, website_type, message)
      VALUES
        (${enquiryId}, ${enquiry.name}, ${enquiry.business}, ${enquiry.email},
         ${enquiry.phone}, ${enquiry.type}, ${enquiry.message})
    `;
  } catch (error) {
    console.error("[contact] Could not store enquiry", error instanceof Error ? error.name : "UnknownError");
    return jsonError(
      response,
      503,
      "We couldn't save your enquiry just now. Please try again in a moment.",
    );
  }

  let resendStatus: number | undefined;
  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [RECIPIENT_EMAIL],
        reply_to: enquiry.email,
        subject: `Website enquiry — ${enquiry.business || enquiry.name}`.replace(/[\r\n]+/g, " "),
        text: makeEmailText(enquiry, enquiryId),
      }),
      signal: AbortSignal.timeout(8000),
    });
    resendStatus = emailResponse.status;

    if (!emailResponse.ok) {
      throw new Error("EmailProviderError");
    }

    const providerResult: unknown = await emailResponse.json().catch(() => null);
    const notificationId =
      typeof providerResult === "object" &&
      providerResult !== null &&
      "id" in providerResult &&
      typeof providerResult.id === "string"
        ? providerResult.id
        : null;

    try {
      await sql`
        UPDATE contact_enquiries
        SET notification_status = 'sent', notification_id = ${notificationId}
        WHERE id = ${enquiryId}
      `;
    } catch (error) {
      // The email has been accepted and the enquiry is already stored. Keep the
      // visitor's submission successful even if this status update cannot be saved.
      console.error("[contact] Could not update delivery status", error instanceof Error ? error.name : "UnknownError");
    }

    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error("[contact] Email notification failed", {
      status: resendStatus ?? "network-error",
      errorType: error instanceof Error ? error.name : "UnknownError",
    });

    try {
      await sql`
        UPDATE contact_enquiries
        SET notification_status = 'failed'
        WHERE id = ${enquiryId}
      `;
    } catch (updateError) {
      console.error("[contact] Could not record notification failure", updateError instanceof Error ? updateError.name : "UnknownError");
    }

    return jsonError(
      response,
      502,
      "Your enquiry has been saved securely, but we couldn't notify our team just now. Please try again shortly.",
    );
  }
}
