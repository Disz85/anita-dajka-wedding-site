import { NextResponse } from 'next/server';
import { translateText } from '@/services/translation/translation.service';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-translation-secret',
};

const ALLOWED_ORIGINS = ['http://localhost:3000', process.env.NEXT_PUBLIC_SITE_URL];

// Simple in-memory rate limiter.
// NOTE: In a serverless environment (like Vercel), this Map will be reset frequently.
// For production-grade rate limiting, use a persistent store like Upstash Redis or Vercel KV.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const relevantRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (relevantRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  relevantRequests.push(now);
  rateLimitMap.set(ip, relevantRequests);
  return false;
};

export const OPTIONS = async () => NextResponse.json({}, { headers: corsHeaders });

export const POST = async (req: Request) => {
  const origin = req.headers.get('origin');

  // Basic Origin Allowlist
  // Check if we are in development or if the origin matches our site
  // Note: 'null' can be sent by some clients/tools, strict blocking might need adjustments.
  if (origin && !ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === 'production') {
    console.warn(`[API/Translate] Blocked origin: ${origin}`);
    // Ideally block here, but for now we proceed or just return 403.
    // User request: "Basic abuse protection"
    return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders });
  }

  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: corsHeaders },
      );
    }

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
