import { type NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      console.warn(message);
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      const message = 'Bad Request: Missing _type';
      console.error(message);
      return new Response(message, { status: 400 });
    }

    console.log(`Revalidating tag: ${body._type}`);
    revalidateTag(body._type);

    return NextResponse.json({ body });
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
