"use client";

/**
 * The only interactive element on the CV, split out so the page itself can
 * stay a server component. The static site used an inline onclick attribute,
 * which React does not support.
 */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()}>
      ↓ Save as PDF
    </button>
  );
}
