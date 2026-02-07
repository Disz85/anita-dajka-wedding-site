import OpenAI from 'openai';
import { type Locale } from '@/i18n/i18n.config';
import { siteConfig } from '@/config/site.config';
import { TRANSLATION_SYSTEM_PROMPT } from '@/constants/translation.constants';
import { TranslateOptions } from './translation.types';

/**
 * AI Powered Translation Service
 * Implemented as a singleton-style instance with lazy initialization.
 */
class TranslationService {
  private static readonly DEFAULT_TEMPERATURE = 0.7;
  private static readonly DEFAULT_MODEL = siteConfig.openai.model;

  private openai: OpenAI | null = null;

  /**
   * Resolves a locale code to its full English name for the AI prompt.
   * Uses the built-in Intl.DisplayNames API for automatic support.
   */
  private getLanguageName(locale: Locale): string {
    try {
      const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
      return displayNames.of(locale) ?? locale;
    } catch {
      return locale;
    }
  }

  private getClient(): OpenAI {
    if (this.openai !== null) {
      return this.openai;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (typeof apiKey !== 'string' || apiKey === '') {
      throw new Error('OPENAI_API_KEY is missing from environment variables.');
    }

    this.openai = new OpenAI({ apiKey });
    return this.openai;
  }

  /**
   * Translates text to the target language using AI.
   * Ensures the text is tailored for a wedding context.
   */
  public async translate({
    text,
    targetLanguage = 'en',
    model = process.env.OPENAI_MODEL ?? TranslationService.DEFAULT_MODEL,
  }: TranslateOptions): Promise<string> {
    if (text === undefined || text === null || text === '') {
      return '';
    }

    const client = this.getClient();
    const languageName = this.getLanguageName(targetLanguage);

    const prompt = `Translate the following wedding-related text to ${languageName}. 
    Style: Elegant, romantic, and concise. 
    Content: "${text}"`;

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: TRANSLATION_SYSTEM_PROMPT,
        },
        { role: 'user', content: prompt },
      ],
      model,
      temperature: TranslationService.DEFAULT_TEMPERATURE,
    });

    const content = completion.choices[0].message.content;

    if (content === null || content === undefined) {
      return '';
    }

    return content.trim();
  }
}

// Export a single instance to be used across the application
const serviceInstance = new TranslationService();

/**
 * Shorthand function for translation
 */
export const translateText = (options: TranslateOptions): Promise<string> => {
  return serviceInstance.translate(options);
};
