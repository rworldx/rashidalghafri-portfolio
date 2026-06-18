import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { projects } from '@content/projects';
import { siteConfig } from '@/config/site.config';

/** Enumerates both locales × all routes (PRD §11). */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/projects', '/resume', '/about', '/contact'];
  const projectPaths = projects.map((p) => `/projects/${p.slug}`);
  const allPaths = [...staticPaths, ...projectPaths];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of allPaths) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${siteConfig.url}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }
  }
  return entries;
}
