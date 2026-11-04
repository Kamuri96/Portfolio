import type { MetadataRoute } from "next";
import { works } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/profile", "/works", "/articles"];
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...works.map((w) => ({ url: `${SITE_URL}/works/${w.id}` })),
  ];
}
