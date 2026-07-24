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

/**
 * A project's visual. A real asset wins whenever one exists; otherwise the
 * generated signature stands in, so a missing image never ships as a grey box
 * or a broken icon.
 *
 * Screenshots and logos are not interchangeable. A screenshot is a wide capture
 * and should bleed to the edges; a logo is a mark, and cropping it decapitates
 * the wordmark, so it is contained and given room.
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
  const thumb = variant === 'thumb' ? project.thumb : undefined;
  const src = thumb?.src ?? project.cover;
  const isLogo = thumb ? thumb.kind === 'logo' : project.coverKind === 'logo';
  const hasThemedPair = Boolean(thumb?.dark);

  if (!src) {
    return (
      <div className={cn('relative overflow-hidden bg-surface-2', className)}>
        <ProjectSignature slug={project.slug} title={project.title} caption={project.role} />
      </div>
    );
  }

  const imgSizes = sizes ?? '(min-width: 1024px) 50vw, 100vw';

  if (isLogo && hasThemedPair && thumb) {
    return (
      <div className={cn('relative overflow-hidden bg-surface-2 [isolation:isolate]', className)}>
        {/* Light: a dark mark on white, multiplied so the white ground drops out. */}
        <Image
          src={thumb.src}
          alt=""
          fill
          priority={priority}
          sizes={imgSizes}
          className="object-contain p-[14%] mix-blend-multiply dark:hidden"
        />
        {/* Dark: a light mark on black, screened so the black ground drops out. */}
        <Image
          src={thumb.dark as string}
          alt=""
          fill
          priority={priority}
          sizes={imgSizes}
          className="hidden object-contain p-[14%] mix-blend-screen dark:block"
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
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={imgSizes}
        className={cn(isLogo ? 'object-contain p-[8%]' : 'object-cover')}
      />
    </div>
  );
}
