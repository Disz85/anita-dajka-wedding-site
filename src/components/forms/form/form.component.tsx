'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@/i18n/i18n.navigation';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { createContactFormSchema, ContactFormData } from '@/lib/types/contact';
import { submitContactAction } from '@/actions/contact.action';
import { Button } from '@/components/ui/button/button.component';
import { Input } from '../input/input.component';
import { Textarea } from '../textarea/textarea.component';
import { FieldSet } from '../fieldset/fieldset.component';

import { DatePicker } from '../date-picker/date-picker.component';

export const Form = ({ redirectUrl }: { redirectUrl?: string }) => {
  const t = useTranslations('contact');
  const locale = useLocale();

  const contactFormSchema = createContactFormSchema((key) => t(`validation.${key}`));

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      location: '',
      referralSource: '',
      message: '',
      confirmEmail: '', // Honeypot
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContactAction({ ...data, locale });

      if (!result.success) {
        setError('root', {
          message: result.message || 'Something went wrong. Please try again.',
        });
        return;
      }

      router.push(redirectUrl || '/thank-you');
      reset();
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {errors.root && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{errors.root.message}</div>
      )}

      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="confirmEmail">Do not fill this out</label>
        <input
          id="confirmEmail"
          type="text"
          {...register('confirmEmail')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <FieldSet legend={t('form.contactDetailsLegend')}>
        <Input
          id="name"
          label={t('form.nameLabel')}
          error={errors.name}
          disabled={isSubmitting}
          {...register('name')}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            id="email"
            type="email"
            label={t('form.emailLabel')}
            error={errors.email}
            disabled={isSubmitting}
            {...register('email')}
          />

          <Input
            id="phone"
            type="tel"
            label={t('form.phoneLabel')}
            error={errors.phone}
            disabled={isSubmitting}
            {...register('phone')}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Controller
            control={control}
            name="eventDate"
            render={({ field }) => (
              <DatePicker
                id="eventDate"
                label={t('form.eventDateLabel')}
                error={errors.eventDate}
                disabled={isSubmitting}
                value={field.value}
                onChange={field.onChange}
                locale={locale}
              />
            )}
          />

          <Input
            id="location"
            label={t('form.locationLabel')}
            error={errors.location}
            disabled={isSubmitting}
            {...register('location')}
          />
        </div>

        <Input
          id="referralSource"
          label={t('form.referralSourceLabel')}
          error={errors.referralSource}
          disabled={isSubmitting}
          {...register('referralSource')}
        />
      </FieldSet>

      <FieldSet legend={t('form.messageLegend')}>
        <Textarea
          id="message"
          label={t('form.messageLabel')}
          rows={5}
          placeholder={t('form.messagePlaceholder')}
          error={errors.message}
          disabled={isSubmitting}
          required
          {...register('message')}
        />
      </FieldSet>

      <div className="pt-6">
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t('form.submittingButton')}</span>
            </div>
          ) : (
            t('form.submitButton')
          )}
        </Button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>{t('form.privacyText')}</p>
        <Link href="/legal" className="mt-1 block underline transition-colors hover:text-gray-900">
          {t('form.privacyPolicyLink')}
        </Link>
      </div>
    </form>
  );
};
