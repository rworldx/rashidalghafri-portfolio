'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/types/project';
import { pick } from '@/lib/localized';
import { Tag } from './Tag';
import { Badge } from './Badge';

/** Project card with hover lift + border→accent (PRD §10). Reused everywhere. */
export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full rounded-lg border border-border bg-surface p-6 shadow-card transition-colors hover:border-accent"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted">{project.year}</span>
            {project.featured && <Badge tone="accent">Featured</Badge>}
          </div>
          <ArrowUpRight className="h-5 w-5 text-text-muted transition-colors group-hover:text-accent rtl:-scale-x-100" />
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold text-text">{project.title}</h3>
        <p className="mt-1 font-mono text-xs text-text-muted">{project.role}</p>
        <p className="mt-3 line-clamp-3 text-text-muted">{pick(project.summary, locale)}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
