import React from 'react';
import { motion } from 'framer-motion';
import { TEXT_CONTAINER_VARIANTS, TEXT_ITEM_VARIANTS } from './hero-slide.variants';

interface AnimatedTextProps {
  text: string;
  className?: string;
  isActive: boolean;
  tag?: React.ElementType;
}

export const AnimatedText = ({
  text,
  className,
  isActive,
  tag: Tag = 'div',
}: AnimatedTextProps) => {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
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
