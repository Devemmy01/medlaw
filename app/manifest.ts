import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.tagline}`,
    short_name: site.name,
    description:
      "Medical law education, patient rights, bioethics research and healthcare accountability resources.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f2e8",
    theme_color: "#04182c",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
