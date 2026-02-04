'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { HamburgerProps } from './hamburger.types';
import { topLineVariants, middleLineVariants, bottomLineVariants } from './hamburger.variants';

export const Hamburger = ({ isOpen, onClick, className }: HamburgerProps): React.JSX.Element => {
  const t = useTranslations('navigation');
  const variantState = isOpen ? 'open' : 'closed';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? t('closeMenu') : t('openMenu')}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        'group relative z-100 flex items-center gap-3 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className,
      )}
    >
      {/* Screen reader only text */}
      <span className="sr-only">{isOpen ? t('closeMenu') : t('openMenuScreenReader')}</span>

      {/* Hamburger icon lines */}
      <div className="flex h-3 w-8 flex-col justify-between items-end" aria-hidden="true">
        <motion.span
          variants={topLineVariants}
          animate={variantState}
          className="block h-px bg-current transition-colors"
        />
        <motion.span
          variants={middleLineVariants}
          animate={variantState}
          className="block h-px bg-current transition-colors"
        />
        <motion.span
          variants={bottomLineVariants}
          animate={variantState}
          className="block h-px bg-current transition-colors"
        />
      </div>
    </button>
  );
};
