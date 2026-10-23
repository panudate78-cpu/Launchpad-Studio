# Launchpad Studio

Professional websites for local businesses — restaurants, cafés, salons, tradespeople and retail stores across Surrey and South West London.

**Live:** https://launchpadstudio.uk

---

## ⚠️ Required one-time fix before your next deploy

Your repository currently has `node_modules/` committed to git. **This is the cause of the
`vite: Permission denied` failure on Vercel and Netlify** — it is not a hosting problem.

When `node_modules` is committed, git checks the files out on the build server without their
executable permission bit. `node_modules/.bin/vite` and the native esbuild binary are then
unrunnable, and the build dies immediately.

A `.gitignore`, a permission-repair `postinstall` hook, and a build script that bypasses
`node_modules/.bin` have all been added to defend against this. The repair hook makes builds
work **even with the existing broken commit**. However, you should still remove
`node_modules` from the repository so it stops being re-uploaded on every push.

Run this from the root of your local clone:

```bash
# 1. Make sure you have the latest .gitignore from this project first
git rm -r --cached node_modules
git commit -m "Remove node_modules from repository (fixes vite permission denied on deploy)"
git push origin main
```

`node_modules/` stays on your machine — only git's tracking of it is removed. Vercel and
Netlify will install it fresh on each build, which is what you want.

---

## Tech stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4

## Local development

```bash
npm install
npm run dev      # start dev server
```

## Production build

```bash
npm run build        # outputs to dist/
npm run preview      # preview the production build locally
npm run typecheck    # TypeScript check only
npm run build:check  # typecheck + build
```

## Deployment

### Vercel

The static site configuration is in `vercel.json`. The enquiry form is handled by the Vercel Serverless Function in `api/contact.ts` and needs the environment variables below before it can send enquiries.

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 20.x (from `.nvmrc`) |

#### Contact form setup (one time)

The form posts to `/api/contact`. The Vercel Serverless Function validates each submission and sends it through your existing Zoho Mail account to `hello@launchpadstudio.uk`. There is **no Neon database and no Resend account**: the received email in your Zoho inbox is the enquiry record. SMTP credentials are used only on the server; do not prefix them with `VITE_` or expose them in frontend code.

1. In Zoho Mail, open **Settings → Mail Accounts → Server Configurations** and copy the SMTP host shown for your account. Zoho's host depends on account type and data centre. Use the full mailbox address as the SMTP username; for two-factor authentication, generate an app-specific password rather than using your normal sign-in password.
2. In **Vercel → Project → Settings → Environment Variables**, add these for the deployment environment you use (Production and Preview as appropriate), then redeploy:

   | Variable | Value |
   | --- | --- |
   | `ZOHO_SMTP_HOST` | The SMTP host shown in Zoho Mail settings (for example, a regional `smtppro` host for a paid custom-domain mailbox) |
   | `ZOHO_SMTP_PORT` | `465` (SSL; default) or `587` (STARTTLS) |
   | `ZOHO_SMTP_USER` | Full Zoho address authorised to send, ideally `hello@launchpadstudio.uk` |
   | `ZOHO_SMTP_PASSWORD` | Zoho app-specific password / SMTP password |

Vercel blocks outbound SMTP on port 25 but permits the authenticated submission ports 465 and 587. This function waits for Zoho to accept the email before showing success. SMTP is the simplest option using your existing mailbox; Vercel notes that an HTTP email API can be more reliable for larger or higher-volume sending. [Vercel SMTP guidance](https://vercel.com/kb/guide/serverless-functions-and-smtp) · [Zoho SMTP settings](https://www.zoho.com/mail/help/zoho-smtp.html)

For local end-to-end testing, copy `.env.example` to `.env.local`, add the Zoho settings, then run `npx vercel dev` (after linking the project with the Vercel CLI). `npm run dev` starts Vite only and does not run Vercel API functions.

### Netlify

The static site can still be built with `netlify.toml`, but `api/contact.ts` is a Vercel Serverless Function. A Netlify deployment would need an equivalent Netlify Function configured with the same Zoho SMTP settings; switching to Netlify does not remove the email credentials requirement.

| Setting | Value |
| --- | --- |
| Build Command | `npm run build` |
| Publish Directory | `dist` |
| Node Version | 20 |

---

## Notes on the build scripts

`package.json` invokes Vite directly rather than through `node_modules/.bin`:

```json
"build": "node node_modules/vite/bin/vite.js build"
```

This is deliberate. It means the build does not depend on npm's bin symlinks having correct
permissions, which removes a whole class of CI-only failures.

`scripts/fix-perms.mjs` runs automatically on `npm install` (via `postinstall`) and re-applies
executable permissions to `node_modules/.bin/*` and the native esbuild binary. On a healthy
install it does nothing; on a damaged one it repairs it.

---

## Project structure

```
index.html                 SEO: title, meta, Open Graph, LocalBusiness schema
src/
  App.tsx                  Page content: services, portfolio, about, contact
  components/
    AdminShowcase.tsx      Admin dashboard viewer (tabbed)
    AdminScreens.tsx       Admin screen recreations
  utils/
    liveScreenshot.ts      Live client-site screenshot URLs + fallback
  assets/admin/            Optional real admin screenshots (auto-detected by filename)
api/
  contact.ts               Vercel enquiry endpoint (Zoho Mail SMTP delivery)
scripts/
  fix-perms.mjs            postinstall permission repair
vercel.json                Vercel build config
netlify.toml               Netlify static-site config
.env.example               Server-side contact form variables
.nvmrc                     Pinned Node version
```

### Optional: real admin screenshots

To show genuine screenshots of your admin dashboard instead of the recreated screens, drop
image files into `src/assets/admin/` named:

`sign-in` · `dashboard` · `menu` · `settings` · `sales` · `food` · `bookings` · `customers`

Use `.png`, `.jpg` or `.webp`. They are detected automatically — no code changes required.
