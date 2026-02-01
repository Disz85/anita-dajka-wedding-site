'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { MenuItem } from '../types/header.types';
import { menuListVariants, menuItemVariants } from '../animations/mobile-menu.variants';

const menuItems: MenuItem[] = [
  { key: 'home', href: '/' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'weddings', href: '/weddings' },
  { key: 'about', href: '/about' },
  { key: 'journal', href: '/journal' },
  { key: 'contact', href: '/contact' },
];

export const MobileMenuBody = (): React.JSX.Element => {
  const t = useTranslations('navigation');

  return (
    <motion.ul
      variants={menuListVariants}
      initial="initial"
      animate="open"
      exit="exit"
      className="flex flex-col gap-4 font-nav list-none pt-0 px-0 pb-8 m-0"
    >
      {menuItems.map((item) => (
        <li key={item.href} className="overflow-hidden">
          <motion.div variants={menuItemVariants}>
            <Link
              href={item.href}
              className="text-3xl tracking-widest uppercase inline-block transition-all duration-500 ease-out hover:tracking-[0.15em] hover:text-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t(item.key)}
            </Link>
          </motion.div>
        </li>
      ))}
    </motion.ul>
  );
};
