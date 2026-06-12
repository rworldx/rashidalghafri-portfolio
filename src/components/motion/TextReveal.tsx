'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before the first word (seconds). */
  delay?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
}

/**
 * Word-by-word mask reveal for headlines (PRD §10 hero reveal). Each word rises
 * from behind a clip. Reduced motion (via MotionProvider) collapses this to a
 * plain opacity fade with no transform. Implemented in Framer Motion to stay
 * within the JS budget rather than shipping GSAP.
 */
export function TextReveal({ text, className, delay = 0, as = 'h1' }: TextRevealProps) {
  const MotionTag = motion[as];
  const words = text.split(' ');

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      animate="visible"
      aria-label={text}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
