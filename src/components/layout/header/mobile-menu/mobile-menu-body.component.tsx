'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DynamicLink } from '@/components/ui/link/dynamic-link.component';
import type { MobileMenuBodyProps } from './mobile-menu.types';
import type { NavLink } from '@/sanity/queries/header.queries';
import { menuListVariants, menuItemVariants } from './mobile-menu.variants';
import { getLocalizedText } from '@/lib/i18n.utils';

const NavItem = ({
  item,
  locale,
  onClose,
}: {
  item: NavLink;
  locale: string;
  onClose: () => void;
}): React.JSX.Element => {
  const label = getLocalizedText(item.label, locale);
  const className =
    'text-3xl font-lora tracking-widest uppercase inline-block transition-all duration-500 ease-out hover:tracking-[0.15em] hover:text-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

  const href =
    item.linkType === 'internal' ? `/${item.internalSlug ?? ''}` : item.externalUrl || '#';

  if (item.linkType === 'external') {
    return (
      <a
        href={href}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}
        className={className}
        onClick={onClose}
      >
        {label}
      </a>
    );
  }

  return (
    <DynamicLink href={href} className={className} onClick={onClose}>
      {label}
    </DynamicLink>
  );
};

export const MobileMenuBody = ({
  navigation,
  locale,
  onClose,
}: MobileMenuBodyProps): React.JSX.Element => {
  return (
    <motion.ul
      variants={menuListVariants}
      initial="initial"
      animate="open"
      exit="exit"
      className="flex flex-col gap-4 font-nav list-none pt-0 px-0 pb-8 m-0"
    >
      {navigation.map((item, index) => (
        <li key={`nav-${index}`} className="overflow-hidden">
          <motion.div variants={menuItemVariants}>
            <NavItem item={item} locale={locale} onClose={onClose} />
          </motion.div>
        </li>
      ))}
    </motion.ul>
  );
};
