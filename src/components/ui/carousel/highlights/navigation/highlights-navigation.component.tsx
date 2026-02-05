'use client';

import { motion } from 'framer-motion';
import { HighlightsNavigationProps } from '../carousel/highlights-carousel.types';
import {
  LongArrowLeft,
  LongArrowRight,
} from '@/components/ui/icons/long-arrows/long-arrows.component';
import {
  NAV_TRANSITION,
  leftArrowVariants,
  rightArrowVariants,
} from './highlights-navigation.variants';
import { useTranslations } from 'next-intl';

/**
 * Ultra-minimalist Awwwards-style navigation.
 * Extended arrow shafts with the same delicate stroke.
 */
const NavButton = ({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
  label: string;
}) => {
  const t = useTranslations('carousel.highlights');
  const isRight = direction === 'right';

  return (
    <motion.button
      onClick={onClick}
      className="group/nav relative flex items-center gap-3 py-2 px-1 focus:outline-none cursor-pointer"
      initial="initial"
      whileHover="hover"
      aria-label={direction === 'left' ? t('prevLabel') : t('nextLabel')}
    >
      {!isRight && (
        <div className="relative w-14 md:w-20 h-[6px] overflow-hidden">
          <motion.div
            variants={leftArrowVariants.layer1}
            transition={NAV_TRANSITION}
            className="absolute inset-0"
          >
            <LongArrowLeft />
          </motion.div>
          <motion.div
            variants={leftArrowVariants.layer2}
            transition={NAV_TRANSITION}
            className="absolute inset-0"
          >
            <LongArrowLeft />
          </motion.div>
        </div>
      )}

      {isRight && (
        <div className="relative w-14 md:w-20 h-[6px] overflow-hidden">
          <motion.div
            variants={rightArrowVariants.layer1}
            transition={NAV_TRANSITION}
            className="absolute inset-0"
          >
            <LongArrowRight />
          </motion.div>
          <motion.div
            variants={rightArrowVariants.layer2}
            transition={NAV_TRANSITION}
            className="absolute inset-0"
          >
            <LongArrowRight />
          </motion.div>
        </div>
      )}
    </motion.button>
  );
};

export const HighlightsNavigation = ({ onPrev, onNext }: HighlightsNavigationProps) => {
  return (
    <div className="hidden md:flex justify-between items-center px-6 -mt-6">
      <NavButton direction="left" onClick={onPrev} label="Prev" />
      <NavButton direction="right" onClick={onNext} label="Next" />
    </div>
  );
};
