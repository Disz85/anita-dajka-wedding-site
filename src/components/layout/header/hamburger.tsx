import React from 'react';
import { motion } from 'framer-motion';
import { HamburgerProps } from './types/header.types';
import {
  menuTextVariants,
  menuTextTransition,
  topLineVariants,
  middleLineVariants,
  bottomLineVariants,
} from './animations/hamburger.variants';

export const Hamburger = ({ isOpen, onClick }: HamburgerProps): React.JSX.Element => {
  const variantState = isOpen ? 'open' : 'closed';

  return (
    <button
      onClick={onClick}
      className="group relative z-[100] flex items-center gap-3 text-primary"
    >
      <div className="hidden overflow-hidden text-xs font-bold tracking-[0.2em] md:block uppercase">
        <motion.div
          variants={menuTextVariants}
          animate={variantState}
          transition={menuTextTransition}
          className="relative h-4 w-12"
        >
          <span className="absolute left-0 top-0">Menu</span>
          <span className="absolute left-0 top-[30px]">Close</span>
        </motion.div>
      </div>
      <div className="flex h-3 w-8 flex-col justify-between items-end">
        <motion.span
          variants={topLineVariants}
          animate={variantState}
          className="block h-[1px] bg-current transition-colors"
        />
        <motion.span
          variants={middleLineVariants}
          animate={variantState}
          className="block h-[1px] bg-current transition-colors"
        />
        <motion.span
          variants={bottomLineVariants}
          animate={variantState}
          className="block h-[1px] bg-current transition-colors"
        />
      </div>
    </button>
  );
};
