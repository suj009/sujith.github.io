import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain static files — no Node server — so the whole
  // site is pre-rendered to ./out at build time.
  output: "export",

  // Emits every route as a directory with an index.html (/cv/index.html rather
  // than /cv.html), which is what Pages' static file server expects.
  trailingSlash: true,

  // next/image's default loader needs a server to optimise on request. Static
  // export has none, so images are served as-authored.
  images: { unoptimized: true },
};

export default nextConfig;
