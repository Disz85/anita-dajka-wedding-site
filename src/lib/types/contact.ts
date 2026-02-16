import { z } from 'zod';

export const createContactFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('nameRequired')),
    email: z.string().email(t('emailInvalid')),
    phone: z.string().optional(),
    eventDate: z.string().optional(), // Date string YYYY-MM-DD
    location: z.string().optional(),
    referralSource: z.string().optional(),
    message: z.string().min(10, { message: t('messageMin') }),
    confirmEmail: z.string().optional(), // Honeypot field
  });

export type ContactFormData = z.infer<ReturnType<typeof createContactFormSchema>>;
