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

Configuration is in `vercel.json`. No dashboard changes needed.

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 20.x (from `.nvmrc`) |

### Netlify

Configuration is in `netlify.toml`. No dashboard changes needed.

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
scripts/
  fix-perms.mjs            postinstall permission repair
vercel.json                Vercel build config
netlify.toml               Netlify build config
.nvmrc                     Pinned Node version
```

### Optional: real admin screenshots

To show genuine screenshots of your admin dashboard instead of the recreated screens, drop
image files into `src/assets/admin/` named:

`sign-in` · `dashboard` · `menu` · `settings` · `sales` · `food` · `bookings` · `customers`

Use `.png`, `.jpg` or `.webp`. They are detected automatically — no code changes required.
