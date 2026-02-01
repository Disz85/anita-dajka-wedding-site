import { type NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export const POST = async (req: NextRequest) => {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      console.error('[API/Revalidate] Missing SANITY_REVALIDATE_SECRET env variable');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<{ _type: string }>(req, secret);

    if (!isValidSignature) {
      console.warn('[API/Revalidate] Invalid signature attempt');
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      console.error('[API/Revalidate] Body missing _type');
      return NextResponse.json({ message: 'Bad Request: Missing _type' }, { status: 400 });
    }

    const tag = body._type;
    console.log(`[API/Revalidate] Success: Revalidating tag "${tag}"`);

    revalidateTag(tag, 'max');

    return NextResponse.json({
      revalidated: true,
      tag,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[API/Revalidate] Unexpected Error:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
