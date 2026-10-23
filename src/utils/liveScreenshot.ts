/**
 * Real, live screenshots of the actual client websites, rendered on demand by a
 * screenshot service and referenced by URL (no local binary assets required).
 *
 * This keeps the project 100% dependency-free for `npm install && npm run dev` —
 * there is nothing to go missing, because nothing is bundled locally.
 *
 * If you'd prefer to self-host static screenshots instead:
 *   1. Save your own capture to `public/screenshots/<name>.jpg`
 *   2. Replace the matching URL below with `/screenshots/<name>.jpg`
 */
export function liveScreenshot(targetUrl: string, widthPx: number, heightPx: number, viewportWidth?: number) {
  const vp = viewportWidth ? `/viewportWidth/${viewportWidth}` : "";
  return `https://image.thum.io/get/width/${widthPx}/crop/${heightPx}${vp}/noanimate/${targetUrl}`;
}

// Fallback shown if a live preview can't be reached (e.g. offline sandbox, blocked domain).
export const SCREENSHOT_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
      <rect width="1200" height="750" fill="#0B1E3B"/>
      <rect x="40" y="40" width="1120" height="670" rx="18" fill="none" stroke="#2A4066" stroke-width="2"/>
      <text x="600" y="355" font-family="Arial, sans-serif" font-size="30" fill="#FF8A5C" text-anchor="middle">Live preview unavailable</text>
      <text x="600" y="395" font-family="Arial, sans-serif" font-size="18" fill="#C9D3E4" text-anchor="middle">Please visit the live website using the link above</text>
    </svg>
  `);
