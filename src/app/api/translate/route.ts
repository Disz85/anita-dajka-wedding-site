import { NextResponse } from 'next/server';
import { translateText } from '@/services/translation/translation.service';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-translation-secret',
};

export const OPTIONS = async () => NextResponse.json({}, { headers: corsHeaders });

export const POST = async (req: Request) => {
  try {
    const secret = req.headers.get('x-translation-secret');
    const { text, targetLanguage } = await req.json();

    console.log(`[API/Translate] Incoming: ${text?.slice(0, 20)}...`);

    // Check Security
    if (process.env.TRANSLATION_SECRET && secret !== process.env.TRANSLATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    if (!text) {
      return NextResponse.json({ error: 'Missing text' }, { status: 400, headers: corsHeaders });
    }

    // Use our clean service
    const translatedText = await translateText({ text, targetLanguage });

    return NextResponse.json({ translatedText }, { status: 200, headers: corsHeaders });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(`[API/Translate] Fail: ${error.message}`);

    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500, headers: corsHeaders },
    );
  }
};
