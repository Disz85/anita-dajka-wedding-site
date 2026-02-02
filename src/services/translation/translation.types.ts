import { type Locale } from '@/i18n/i18n.config';

export type TranslateOptions = {
  text: string;
  targetLanguage?: Locale;
  model?: string;
};

export type ITranslationService = {
  translate(options: TranslateOptions): Promise<string>;
};
