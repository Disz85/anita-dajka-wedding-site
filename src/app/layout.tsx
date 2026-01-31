import type { Metadata } from 'next';
import { Header } from '@/components/layout/header/header';
import { cormorant, lora, raleway } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anita Dajka Wedding',
  description: 'Global Destination Wedding Photographer',
};

/**
 * Root Layout Component
 *
 * This is the top-level layout for the entire application.
 * It handles:
 * - HTML and Body tag definition
 * - Global Font injection (CSS variables)
 * - Global styles application
 *
 * @param children - The page content to be rendered within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${lora.variable} ${raleway.variable} font-body text-primary antialiased bg-background`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
