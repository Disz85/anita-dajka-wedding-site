'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/i18n.navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site.config';
import type { LanguageSwitcherProps } from './types/language-switcher.types';
import { dropdownVariants, iconVariants } from './animations/language-switcher.variants';
import { useClickOutside } from '@/hooks/use-click-outside.hook';
import { useAppLocale } from '@/hooks/use-app-locale.hook';

export const LanguageSwitcher = ({
  className,
  variant = 'default',
}: LanguageSwitcherProps): React.JSX.Element => {
  const t = useTranslations('navigation');
  const locale = useAppLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const isMobile = variant === 'mobile';

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1 font-nav text-xs uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer',
          isMobile ? 'text-primary' : 'text-primary hover:text-primary/70',
          isOpen && 'opacity-70',
        )}
        aria-label={t('selectLanguage')}
        aria-expanded={isOpen}
      >
        <span>{locale}</span>
        <motion.div variants={iconVariants} animate={isOpen ? 'open' : 'closed'}>
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              'absolute top-full mt-2 w-full min-w-[80px] bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden z-[110]',
              'left-1/2 -translate-x-1/2',
            )}
          >
            <ul className="py-1 m-0 list-none">
              {siteConfig.i18n.locales.map((localeOption) => (
                <li key={localeOption}>
                  <Link
                    href={pathname}
                    locale={localeOption}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-xs font-nav uppercase tracking-wider flex items-center justify-between hover:bg-gray-50 transition-colors decoration-0',
                      locale === localeOption ? 'text-primary' : 'text-gray-600',
                    )}
                  >
                    {localeOption.toUpperCase()}
                    {locale === localeOption && <Check size={12} className="ml-2 text-primary" />}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
