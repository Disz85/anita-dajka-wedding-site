'use server';

import { createClient } from 'next-sanity';
import { Resend } from 'resend';
import { getTranslations } from 'next-intl/server';
import { createContactFormSchema, ContactFormData } from '@/lib/types/contact';
import { siteConfig } from '@/config/site.config';
import { ContactNotificationEmail } from '@/components/emails/contact-notification';
import { ContactConfirmationEmail } from '@/components/emails/contact-confirmation';

// Create a Sanity client with write access
const writeClient = createClient({
  projectId: siteConfig.sanity.projectId,
  dataset: siteConfig.sanity.dataset,
  apiVersion: siteConfig.sanity.apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function submitContactAction(
  data: ContactFormData & { locale: string },
): Promise<{ success: boolean; errors?: Record<string, string[] | undefined>; message?: string }> {
  const { locale = 'en', ...formData } = data;

  // Get translations for validation messages on server
  const t = await getTranslations({ locale, namespace: 'contact.validation' });

  // Custom translation function for schema
  const tSchema = (key: string) => t(key);

  // Re-validate specifically for server-side safety
  const contactFormSchema = createContactFormSchema(tSchema);
  const result = contactFormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Invalid input data',
    };
  }

  const validData = result.data;

  // Honeypot check
  if (validData.confirmEmail) {
    return { success: true };
  }

  try {
    // Create Sanity document
    await writeClient.create({
      _type: 'inquiry',
      ...validData,
      status: 'new',
      source: 'contact-form',
      submittedAt: new Date().toISOString(),
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Notification to owner
      const ownerEmail = process.env.CONTACT_TO_EMAIL;
      if (ownerEmail) {
        await resend.emails.send({
          from: 'Anita Dajka Wedding Photography <onboarding@resend.dev>',
          to: ownerEmail,
          subject: `New Inquiry: ${validData.name}`,
          react: <ContactNotificationEmail data={validData} />,
          replyTo: validData.email,
        });
      }

      // Confirmation to user
      const tEmail = await getTranslations({ locale, namespace: 'contact.email.confirmation' });
      await resend.emails.send({
        from: 'Anita Dajka Wedding Photography <onboarding@resend.dev>',
        to: validData.email,
        subject: tEmail('subject'),
        react: (
          <ContactConfirmationEmail
            name={validData.name}
            greeting={tEmail('greeting', { name: validData.name })}
            body1={tEmail('body1')}
            body2={tEmail('body2')}
            closing={tEmail('closing')}
            signature={tEmail('signature')}
          />
        ),
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Submission error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
