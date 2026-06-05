import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      // Legacy /venue/[id] → /venues/[slug] (301 permanent)
      { source: '/venue/son-marroig',       destination: '/venues/son-marroig-wedding-cost',       permanent: true },
      { source: '/venue/finca-comassema',   destination: '/venues/finca-comassema-wedding-cost',   permanent: true },
      { source: '/venue/finca-son-mir',     destination: '/venues/finca-son-mir-wedding-cost',     permanent: true },
      { source: '/venue/son-togores',       destination: '/venues/son-togores-wedding-cost',       permanent: true },
      { source: '/venue/finca-son-berga',    destination: '/venues/finca-son-berga-wedding-cost',    permanent: true },
      { source: '/venue/finca-biniorella',  destination: '/venues/finca-biniorella-wedding-cost',  permanent: true },
    ];
  },
};

export default nextConfig;
