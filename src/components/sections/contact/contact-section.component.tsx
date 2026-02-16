import { Form } from '@/components/forms/form/form.component';
import { Section } from '@/components/ui/section/section.component';
import { getLocalizedValue } from '@/lib/sanity-utils';
import { useLocale } from 'next-intl';
import { ContactSectionData } from '@/sanity/queries/page.queries';
import { SiteSettings } from '@/sanity/queries/settings.queries';
import { Phone, Mail, Instagram } from 'lucide-react';

export const ContactSection = ({
  data,
  settings,
}: {
  data: ContactSectionData;
  settings: SiteSettings;
}) => {
  const locale = useLocale();

  const title = data.title ? getLocalizedValue<string>(data.title, locale) : undefined;
  const subtitle = data.subtitle ? getLocalizedValue<string>(data.subtitle, locale) : undefined;

  const { phone, email, instagramUrl } = settings || {};

  const formatPhone = (p: string) => p.replace(/\s/g, '');
  const formatInstagramHandle = (url: string) => {
    try {
      const parts = url.split('/').filter(Boolean);
      return parts.pop() || 'anitadajkawedding';
    } catch {
      return 'anitadajkawedding';
    }
  };

  return (
    <Section spacing="default">
      <div className="mx-auto max-w-2xl px-4">
        {(title || subtitle) && (
          <Section.Header
            title={title || ''}
            subtitle={subtitle}
            titleSize="contact"
            subtitlePosition="bottom"
            align="responsive"
            subtitleTone="primary"
            className="mb-12 w-full"
          />
        )}

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 font-body text-lg md:text-xl font-light text-primary">
          {phone && (
            <div className="flex items-center gap-3">
              <a
                href={`tel:${formatPhone(phone)}`}
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                <Phone strokeWidth={1} className="w-5 h-5 md:w-6 md:h-6" />
                <span>{phone}</span>
              </a>
            </div>
          )}

          {instagramUrl && (
            <div className="flex items-center gap-3 md:justify-start">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                <Instagram strokeWidth={1} className="w-5 h-5 md:w-6 md:h-6" />
                <span>{formatInstagramHandle(instagramUrl)}</span>
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                <Mail strokeWidth={1} className="w-5 h-5 md:w-6 md:h-6" />
                <span>{email}</span>
              </a>
            </div>
          )}
        </div>

        <Form redirectUrl={data.redirectUrl} />
      </div>
    </Section>
  );
};
