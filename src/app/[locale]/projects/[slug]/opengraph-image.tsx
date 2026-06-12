import { ImageResponse } from 'next/og';
import { projects, getProject } from '@content/projects';
import { siteConfig } from '@/config/site.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project case study';

/** Pre-generate an OG image per project per locale. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOg({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? siteConfig.name;
  const summary = project ? project.summary[locale as 'en' | 'ar'] ?? project.summary.en : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0e14',
          color: '#eceff4',
        }}
      >
        <div style={{ fontSize: 26, color: '#5b82ff', textTransform: 'uppercase', letterSpacing: 4 }}>
          Case study
        </div>
        <div style={{ fontSize: 100, fontWeight: 700, marginTop: 16, letterSpacing: '-0.03em' }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#9aa5b8',
            marginTop: 20,
            maxWidth: 1000,
            lineHeight: 1.3,
            display: 'flex',
          }}
        >
          {summary.slice(0, 120)}
        </div>
        <div style={{ fontSize: 26, color: '#9aa5b8', marginTop: 'auto' }}>{siteConfig.name}</div>
      </div>
    ),
    size,
  );
}
