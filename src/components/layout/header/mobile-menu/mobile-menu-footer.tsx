'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Instagram, Facebook } from 'lucide-react';
import { menuFooterVariants } from '../animations/mobile-menu.variants';
import type { MobileMenuFooterProps } from '../types/header.types';

export const MobileMenuFooter = ({ settings }: MobileMenuFooterProps): React.JSX.Element => {
  const t = useTranslations('contact');

  // Get contact info from CMS settings with fallbacks
  const phone = settings?.phone ?? '';
  const email = settings?.email ?? '';
  const instagramUrl = settings?.instagramUrl ?? '';
  const facebookUrl = settings?.facebookUrl ?? '';

  return (
    <motion.footer
      variants={menuFooterVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-6 pt-8 border-t border-gray-200"
    >
      <section id="mobile-contact" aria-labelledby="contact-heading">
        <h3 id="contact-heading" className="font-subtitle text-lg uppercase tracking-wider mb-4">
          {t('title')}
        </h3>
        <address className="flex flex-col gap-3 not-italic">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-xl tracking-wider hover:text-primary/70 hover:underline underline-offset-8 decoration-primary/30 decoration-[0.5px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={t('phoneLabel', { phone })}
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-xl tracking-wider hover:text-primary/70 hover:underline underline-offset-8 decoration-primary/30 decoration-[0.5px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={t('emailLabel', { email })}
            >
              {email}
            </a>
          )}
        </address>
      </section>

      {(instagramUrl || facebookUrl) && (
        <nav aria-label={t('socialLinksLabel')} className="flex gap-4">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -m-2 hover:text-primary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={t('instagramLabel')}
            >
              <Instagram size={24} strokeWidth={1} aria-hidden="true" />
            </a>
          )}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 -m-2 hover:text-primary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={t('facebookLabel')}
            >
              <Facebook size={24} strokeWidth={1} aria-hidden="true" />
            </a>
          )}
        </nav>
      )}
    </motion.footer>
  );
};
