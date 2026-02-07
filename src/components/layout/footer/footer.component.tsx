'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container/container.component';
import { getLocalizedText } from '@/lib/i18n.utils';
import { FooterBrand } from './footer-brand/footer-brand.component';
import { FooterTagline } from './footer-tagline/footer-tagline.component';
import { FooterFollow } from './footer-follow/footer-follow.component';
import { FooterInstagramGrid } from './footer-instagram-grid/footer-instagram-grid.component';
import { FooterSocial } from './footer-social/footer-social.component';
import { FooterCopyright } from './footer-copyright/footer-copyright.component';
import { FooterLegal } from './footer-legal/footer-legal.component';
import type { FooterProps } from './footer.types';

export const Footer = ({ data, settings, locale }: FooterProps): React.JSX.Element => {
  const t = useTranslations('footer');
  const brandName = getLocalizedText(data?.brandName, locale);
  const tagline = getLocalizedText(data?.tagline, locale);
  const instagramHandle = data?.instagramHandle ?? '';
  const instagramImages = data?.instagramImages ?? [];
  const instagramUrl = settings?.instagramUrl ?? '';
  const facebookUrl = settings?.facebookUrl ?? '';
  const siteTitle = settings?.siteTitle ?? '';
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 md:pt-12 md:pb-4" role="contentinfo" aria-label={t('footerAriaLabel')}>
      <Container size="default" className="flex flex-col items-center text-center">
        <FooterBrand brandName={brandName} />
        <FooterTagline tagline={tagline} />
        <FooterFollow
          instagramUrl={instagramUrl}
          instagramHandle={instagramHandle}
          followAlongLabel={t('followAlong')}
          ariaLabel={t('instagramAriaLabel', { handle: instagramHandle })}
        />
        <FooterInstagramGrid
          images={instagramImages}
          instagramUrl={instagramUrl}
          navAriaLabel={t('instagramImagesLabel')}
          getImageAriaLabel={(index) => t('instagramImageLabel', { index })}
        />
        <FooterSocial
          instagramUrl={instagramUrl}
          facebookUrl={facebookUrl}
          navAriaLabel={t('socialLinksLabel')}
          instagramIconAriaLabel={t('instagramIconLabel')}
          facebookIconAriaLabel={t('facebookIconLabel')}
        />
        <FooterCopyright siteTitle={siteTitle} year={year} />
        <FooterLegal
          privacyLabel={t('legalPrivacy')}
          impressumLabel={t('legalImpressum')}
          privacyHref="/privacy"
          legalHref="/legal"
        />
      </Container>
    </footer>
  );
};
