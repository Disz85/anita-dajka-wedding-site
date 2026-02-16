import { Hero } from './hero/hero.component';
import { Introduction } from './introduction/introduction.component';
import { Highlights } from './highlights/highlights.component';
import { Video } from './video/video.component';
import { PortfolioSection } from './portfolio/portfolio-section.component';
import { Testimonials } from './testimonials/testimonials.component';
import { GallerySection } from './gallery/gallery-section.component';
import { StorySection } from './story/story-section.component';
import { ContactSection } from './contact/contact-section.component';
import { SectionData } from '@/sanity/queries/page.queries';

import { SiteSettings } from '@/sanity/queries/settings.queries';

export const SectionRenderer = ({
  sections,
  settings,
}: {
  sections: SectionData[];
  settings: SiteSettings;
}) => {
  if (!sections) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        const { _type, _key } = section;

        switch (_type) {
          case 'heroSection':
            return <Hero key={_key} data={section} />;
          case 'introductionSection':
            return <Introduction key={_key} data={section} />;
          case 'highlightsSection':
            return <Highlights key={_key} data={section} />;
          case 'videoSection':
            return <Video key={_key} data={section} />;
          case 'portfolioSection':
            return <PortfolioSection key={_key} data={section} />;
          case 'testimonialsSection':
            return <Testimonials key={_key} data={section} />;
          case 'gallerySection':
            return <GallerySection key={_key} data={section} />;
          case 'storySection':
            return <StorySection key={_key} data={section} />;
          case 'contactSection':
            return <ContactSection key={_key} data={section} settings={settings} />;
          default:
            console.warn(`Unknown section type: ${_type}`);
            return null;
        }
      })}
    </>
  );
};
