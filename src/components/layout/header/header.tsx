'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Hamburger } from './hamburger';
import { MobileMenu } from './mobile-menu/mobile-menu';
import { DesktopMenu } from './desktop-menu';
import { Logo } from './logo';

export const Header = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-gray-100">
      <Container className="flex items-center justify-between h-20">
        <Logo
          variant={isOpen ? 'overlay' : 'default'}
          className={cn('md:hidden z-50', isOpen && 'z-[100] relative')}
        />
        <DesktopMenu />
        <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="md:hidden" />
      </Container>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={isOpen} />
    </header>
  );
};
