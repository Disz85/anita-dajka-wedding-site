import OpenAI from 'openai';

interface TranslateOptions {
  text: string;
  targetLanguage?: 'en' | 'hu';
  model?: string;
}

export const translateText = async ({
  text,
  targetLanguage = 'en',
  model = process.env.OPENAI_MODEL || 'gpt-4o-mini',
}: TranslateOptions): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  const openai = new OpenAI({ apiKey });

  const prompt = `Translate the following wedding-related text to ${
    targetLanguage === 'en' ? 'English' : 'Hungarian'
  }. Keep it elegant and concise.
  Text: "${text}"`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model,
  });

  return completion.choices[0].message.content?.trim() || '';
};
