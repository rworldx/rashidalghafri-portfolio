import { site } from '@content/site';
import { projects } from '@content/projects';
import { siteConfig } from '@/config/site.config';

/**
 * Person + CreativeWork structured data (PRD §11). Rendered once on the home
 * page. Pure server component — emits a JSON-LD script tag.
 */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: siteConfig.url,
    email: `mailto:${site.email}`,
    jobTitle: 'Software Engineer',
    address: { '@type': 'PostalAddress', addressCountry: 'OM' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Al Buraimi University College',
    },
    sameAs: site.socials
      .filter((s) => s.id !== 'email')
      .map((s) => s.href),
    knowsAbout: ['Full-Stack Development', 'Real-time Systems', 'AI Integration'],
    subjectOf: projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.title,
      url: p.liveUrl ?? `${siteConfig.url}/projects/${p.slug}`,
      description: p.summary.en,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Controlled, non-user content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
