import Image from 'next/image';
import type { Project } from '@/types/project';
import { cn } from '@/lib/cn';
import { imageBlur } from '@content/image-blur';
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
  /**
   * On screen, but not detectably so. Forces `loading="eager"` without the
   * preload that `priority` adds. Needed by the 3D deck, where the turned side
   * cards never trip the browser's intersection check.
   */
  eager?: boolean;
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
  eager = false,
  sizes,
  className,
}: Props) {
  const asset = resolveAsset(project, variant);
  const isLogo = asset.kind === 'logo';
  /**
   * Any asset with both variants swaps with the theme, not just logos.
   *
   * This used to require `isLogo`, so a SCREENSHOT with a dark capture fell
   * through to the single-image branch and stayed frozen on its light version
   * while the rest of the page changed around it.
   *
   * The two kinds swap differently, and that difference is the reason the
   * check was tangled up with `isLogo` in the first place. A logo has a baked
   * ground that must be blended away and is contained inside the frame. A
   * screenshot is the picture itself: it bleeds to the edges and must never be
   * blended, or the theme's background would show through the interface.
   */
  const hasThemedPair = Boolean(asset.src) && Boolean(asset.dark);
  const imgSizes = sizes ?? '(min-width: 1024px) 50vw, 100vw';

  /**
   * `eager` exists for images that ARE on screen but that the browser cannot
   * tell are on screen.
   *
   * Next lazy-loads by default using an intersection check. Inside a
   * `transform-style: preserve-3d` context that check does not fire for the
   * turned side cards of the deck, so their covers never started loading and
   * the neighbours sat blank until one was swiped to the centre. `priority` is
   * the wrong tool for that: it also preloads, and the deck is below the fold.
   */
  const loading = priority ? undefined : eager ? ('eager' as const) : undefined;

  // Padding is small on purpose: the mark should read big. It sits well inside
  // the frame either way because the source is square and the frame is wide.
  const logoPad = 'p-[6%]';

  /**
   * A 16px preview, inlined so the frame is never blank while the real file
   * arrives. Next needs an explicit `blurDataURL` for images referenced by
   * path rather than by static import, so the previews are generated from the
   * real files and checked in (content/image-blur.ts).
   */
  const blurFor = (src: string) => imageBlur[src.split('/').pop() ?? ''];

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
          'relative overflow-hidden bg-surface-2',
          // Isolation only matters where a blend mode is in play.
          isLogo && '[isolation:isolate]',
          className,
        )}
      >
        {/* Light variant. */}
        <Image
          src={asset.src as string}
          alt=""
          fill
          priority={priority}
          loading={loading}
          sizes={imgSizes}
          placeholder={blurFor(asset.src as string) ? 'blur' : 'empty'}
          blurDataURL={blurFor(asset.src as string)}
          className={cn(
            'dark:hidden',
            isLogo
              ? // A dark mark on white, multiplied so the white ground drops out.
                cn('object-contain mix-blend-multiply', logoPad)
              : 'object-cover',
          )}
        />
        {/* Dark variant. */}
        <Image
          src={asset.dark as string}
          alt=""
          fill
          priority={priority}
          loading={loading}
          sizes={imgSizes}
          placeholder={blurFor(asset.dark as string) ? 'blur' : 'empty'}
          blurDataURL={blurFor(asset.dark as string)}
          className={cn(
            'hidden dark:block',
            isLogo
              ? // A light mark on black, screened so the black ground drops out.
                cn('object-contain mix-blend-screen', logoPad)
              : 'object-cover',
          )}
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
        loading={loading}
        sizes={imgSizes}
        placeholder={blurFor(asset.src) ? 'blur' : 'empty'}
        blurDataURL={blurFor(asset.src)}
        className={cn(isLogo ? cn('object-contain', logoPad) : 'object-cover')}
      />
    </div>
  );
}
