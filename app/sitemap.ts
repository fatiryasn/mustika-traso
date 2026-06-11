import { MetadataRoute } from "next";
import { COMPANY_DATA, ROUTES } from "@/data/constants";
import { getProductSlugs } from "@/lib/product/product";
import { getProjectSlugs } from "@/lib/project/project";
import { getArticleSlugs } from "@/lib/article/article"; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = Object.values(ROUTES).map((route) => ({
    url: `${COMPANY_DATA.base_url}${route}`,
    lastModified: new Date(),
  }));

  const [productSlugs, projectSlugs, articleSlugs] = await Promise.all([
    getProductSlugs(),
    getProjectSlugs(),
    getArticleSlugs(),
  ]);

  const productUrls = productSlugs.map((slug) => ({
    url: `${COMPANY_DATA.base_url}/produk/${slug}`,
    lastModified: new Date(),
  }));

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${COMPANY_DATA.base_url}/proyek/${slug}`,
    lastModified: new Date(),
  }));

  const articleUrls = articleSlugs.map((slug) => ({
    url: `${COMPANY_DATA.base_url}/artikel/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productUrls, ...projectUrls, ...articleUrls];
}
