'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { MobileMenuProps } from './types/header.types';
import {
  menuContentLayerVariants,
  menuIntroLayerVariants,
  menuListVariants,
  menuItemVariants,
} from './animations/mobile-menu.variants';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export const MobileMenu = ({ isOpen }: MobileMenuProps): React.JSX.Element => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={menuIntroLayerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-full bg-black z-[60]"
          />

          <motion.div
            variants={menuContentLayerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-full bg-white text-primary z-[60]"
          >
            <Container className="flex h-full flex-col">
              <div className="flex h-full w-full flex-col justify-between pt-28 pb-10">
                <motion.div
                  variants={menuListVariants}
                  initial="initial"
                  animate="open"
                  exit="exit"
                  className="flex flex-col gap-4 font-nav"
                >
                  {menuItems.map((item, index) => (
                    <div key={index} className="overflow-hidden">
                      <motion.div variants={menuItemVariants}>
                        <Link
                          href={item.href}
                          className="text-5xl uppercase tracking-tighter sm:text-7xl md:text-8xl"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>

                <a href="mailto:hello@anitadajka.com">hello@anitadajka.com</a>
              </div>
            </Container>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
