import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/charitable-work", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/research-media", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/donate", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/get-involved", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route.path, site.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
