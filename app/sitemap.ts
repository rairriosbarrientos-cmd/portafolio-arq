import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/proyectos/${p.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: [`${base}${p.images[0].src}`],
    })),
  ];
}
