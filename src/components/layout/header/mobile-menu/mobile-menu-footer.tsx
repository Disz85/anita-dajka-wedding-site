'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Instagram, Facebook } from 'lucide-react';
import { menuFooterVariants } from '../animations/mobile-menu.variants';

const CONTACT_INFO = {
  phone: '+36 30 123 4567',
  email: 'hello@anitadajka.com',
  instagram: 'https://instagram.com/anitadajka',
  facebook: 'https://facebook.com/anitadajka',
} as const;

export const MobileMenuFooter = (): React.JSX.Element => {
  const t = useTranslations('contact');

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
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            className="text-xl tracking-wider hover:text-primary/70 hover:underline underline-offset-8 decoration-primary/30 decoration-[0.5px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={t('phoneLabel', { phone: CONTACT_INFO.phone })}
          >
            {CONTACT_INFO.phone}
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-xl tracking-wider hover:text-primary/70 hover:underline underline-offset-8 decoration-primary/30 decoration-[0.5px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={t('emailLabel', { email: CONTACT_INFO.email })}
          >
            {CONTACT_INFO.email}
          </a>
        </address>
      </section>

      <nav aria-label={t('socialLinksLabel')} className="flex gap-4">
        <a
          href={CONTACT_INFO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 -m-2 hover:text-primary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t('instagramLabel')}
        >
          <Instagram size={24} strokeWidth={1} aria-hidden="true" />
        </a>
        <a
          href={CONTACT_INFO.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 -m-2 hover:text-primary/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t('facebookLabel')}
        >
          <Facebook size={24} strokeWidth={1} aria-hidden="true" />
        </a>
      </nav>
    </motion.footer>
  );
};
