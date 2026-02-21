import { AboutSectionData } from '@/sanity/queries/page.queries';
import { aboutSectionAnimations } from './about-section.animations';

export type AboutSectionProps = {
  data: AboutSectionData;
};

export type AboutSectionAnimations = typeof aboutSectionAnimations;
