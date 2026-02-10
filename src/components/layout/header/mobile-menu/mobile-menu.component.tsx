'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container/container.component';
import { MobileMenuProps } from './mobile-menu.types';
import { MobileMenuBody } from './mobile-menu-body.component';
import { MobileMenuFooter } from './mobile-menu-footer.component';
import { menuContentLayerVariants } from './mobile-menu.variants';

export const MobileMenu = ({
  isOpen,
  navigation,
  settings,
  locale,
}: MobileMenuProps): React.JSX.Element => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile Navigation"
            variants={menuContentLayerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 h-screen w-full bg-white text-primary z-60 flex flex-col"
          >
            <div className="h-20 shrink-0" />

            <div className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y">
              <Container
                withPaddingForDesktop={true}
                className="flex min-h-full flex-col justify-between pb-10 pt-4"
              >
                <MobileMenuBody navigation={navigation} locale={locale} />
                <MobileMenuFooter settings={settings} />
              </Container>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};
