'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TEXT_CONTAINER_VARIANTS, TEXT_ITEM_VARIANTS } from './hero-slide.variants';
import { useReducedMotion } from '@/hooks/use-reduced-motion/use-reduced-motion.hook';

interface AnimatedTextProps {
  text: string;
  className?: string;
  isActive: boolean;
  tag?: React.ElementType;
}

/**
 * Animated text component with word-by-word reveal animation.
 *
 * A11y features:
 * - Screen reader gets full text via sr-only span
 * - Visual animation is aria-hidden
 * - Respects prefers-reduced-motion (WCAG 2.3.3)
 */
export const AnimatedText = ({
  text,
  className,
  isActive,
  tag: Tag = 'div',
}: AnimatedTextProps) => {
  const words = text.split(' ');
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, show text without animation
  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {/* Accessible text for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Visual animated text (hidden from screen readers) */}
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        animate={isActive ? 'visible' : 'exit'}
        variants={TEXT_CONTAINER_VARIANTS}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-4 -mb-4 mr-[0.2em] last:mr-0"
          >
            <motion.span className="inline-block" variants={TEXT_ITEM_VARIANTS}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
