'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { Hamburger } from './hamburger';
import { MobileMenu } from './mobile-menu';

export const Header = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-gray-100">
      <Container className="flex items-center justify-between h-20">
        <Link
          href="/"
          className={cn(
            'font-heading text-2xl uppercase tracking-widest z-50 transition-colors',
            isOpen && 'z-[100] text-white mix-blend-difference relative',
          )}
        >
          Anita Dajka
        </Link>
        <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </Container>
      <MobileMenu isOpen={isOpen} />
    </header>
  );
};
