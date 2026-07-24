import Image from 'next/image';
import type { Project } from '@/types/project';
import { cn } from '@/lib/cn';
import { ProjectSignature } from './ProjectSignature';

interface Props {
  project: Project;
  /**
   * `cover` — the large feature block and the case-study hero.
   * `thumb` — the compact work-grid card, which can carry its own asset.
   */
  variant?: 'cover' | 'thumb';
  /** Above the fold? Then it is the LCP candidate and must not lazy-load. */
  priority?: boolean;
  /** Rendered width hint for the responsive srcset. */
  sizes?: string;
  className?: string;
}

interface Asset {
  src?: string;
  /** Dark-theme counterpart, for logos with a baked-in background. */
  dark?: string;
  kind: 'screenshot' | 'logo';
}

function resolveAsset(project: Project, variant: 'cover' | 'thumb'): Asset {
  // A thumb, if set, overrides only the compact grid card.
  if (variant === 'thumb' && project.thumb) return project.thumb;
  return {
    src: project.cover,
    dark: project.coverDark,
    kind: project.coverKind ?? 'screenshot',
  };
}

/**
 * A project's visual. A real asset wins whenever one exists; otherwise the
 * generated signature stands in, so a missing image never ships as a grey box
 * or a broken icon.
 *
 * Screenshots and logos are not interchangeable. A screenshot is a wide capture
 * and should bleed to the edges; a logo is a mark, and cropping it decapitates
 * the wordmark, so it is contained and shown large.
 *
 * Logos also arrive as JPEGs with a baked-in background and no alpha. Where a
 * light/dark pair exists, each variant is blended against the site's own
 * surface — `multiply` drops a white ground, `screen` drops a black one — so
 * the mark sits on the page instead of inside a visible rectangle. A lone
 * variant cannot do that, so it keeps a neutral plate instead.
 */
export function ProjectMedia({
  project,
  variant = 'cover',
  priority = false,
  sizes,
  className,
}: Props) {
  const asset = resolveAsset(project, variant);
  const isLogo = asset.kind === 'logo';
  const hasThemedPair = isLogo && Boolean(asset.src) && Boolean(asset.dark);
  const imgSizes = sizes ?? '(min-width: 1024px) 50vw, 100vw';

  // Padding is small on purpose: the mark should read big. It sits well inside
  // the frame either way because the source is square and the frame is wide.
  const logoPad = 'p-[6%]';

  if (!asset.src) {
    return (
      <div className={cn('relative overflow-hidden bg-surface-2', className)}>
        <ProjectSignature
          slug={project.slug}
          title={project.title}
          caption={project.role}
        />
      </div>
    );
  }

  if (hasThemedPair) {
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-surface-2 [isolation:isolate]',
          className,
        )}
      >
        {/* Light: a dark mark on white, multiplied so the white ground drops out. */}
        <Image
          src={asset.src as string}
          alt=""
          fill
          priority={priority}
          sizes={imgSizes}
          className={cn('object-contain mix-blend-multiply dark:hidden', logoPad)}
        />
        {/* Dark: a light mark on black, screened so the black ground drops out. */}
        <Image
          src={asset.dark as string}
          alt=""
          fill
          priority={priority}
          sizes={imgSizes}
          className={cn('hidden object-contain mix-blend-screen dark:block', logoPad)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        // A lone logo variant keeps its own background, so it needs a matching
        // plate rather than the themed surface.
        isLogo ? 'bg-white' : 'bg-surface-2',
        className,
      )}
    >
      <Image
        src={asset.src}
        alt=""
        fill
        priority={priority}
        sizes={imgSizes}
        className={cn(isLogo ? cn('object-contain', logoPad) : 'object-cover')}
      />
    </div>
  );
}
