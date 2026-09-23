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

/**
 * The shared social card, named on EVERY page.
 *
 * Next attaches a file-based image only to the segment that holds the file,
 * and opengraph-image.tsx sits at the app root while every page lives under
 * `[locale]`. Nothing inherited it, so the homepage, /about, /contact,
 * /resume and /projects all shipped with no `og:image` at all.
 *
 * That silence is not neutral. WhatsApp and Snapchat honour `og:image` and
 * nothing else, so they showed a bare link. LinkedIn and Instagram fall back
 * to scraping the page for pictures, and took the first one in the markup:
 * the StudyNest logo in the work deck. Naming the image here means every
 * platform is told what to show instead of guessing.
 */
function ogImage() {
  return {
    url: `${siteConfig.url}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: siteConfig.ogImageAlt,
  };
}

type MetaKey = 'home' | 'projects' | 'resume' | 'about' | 'contact';

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
      images: [ogImage()],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage().url],
    },
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
      images: [{ url: `${canonical}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${canonical}/opengraph-image`],
    },
  };
}
