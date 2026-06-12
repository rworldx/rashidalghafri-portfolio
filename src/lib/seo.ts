import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site.config';

/** Build locale-prefixed alternate URLs for a path (PRD §11). */
function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    languages[locale] = `${siteConfig.url}${prefix}${path === '/' ? '' : path}`;
  }
  return languages;
}

type MetaKey = 'home' | 'projects' | 'about' | 'contact';

/** Per-route metadata from the `meta` message namespace + canonical/alternates. */
export async function buildMetadata(
  locale: string,
  key: MetaKey,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${key}` });
  const title = t('title');
  const description = t('description');
  const canonical =
    locale === routing.defaultLocale
      ? `${siteConfig.url}${path === '/' ? '' : path}`
      : `${siteConfig.url}/${locale}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical, languages: alternates(path) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** Metadata for a dynamic project case study. */
export function buildProjectMetadata(
  locale: string,
  slug: string,
  title: string,
  description: string,
): Metadata {
  const path = `/projects/${slug}`;
  const canonical =
    locale === routing.defaultLocale
      ? `${siteConfig.url}${path}`
      : `${siteConfig.url}/${locale}${path}`;
  return {
    title: `${title} — ${siteConfig.name}`,
    description,
    alternates: { canonical, languages: alternates(path) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: 'article',
    },
  };
}
