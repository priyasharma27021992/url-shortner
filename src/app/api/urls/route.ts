import { authOptions } from '@/src/lib/authOptions';
import { createUrl, getUrlsForUser } from '@/src/lib/url';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get session data
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.redirect('/dashboard');
  }

  // get skip and take params from the URL
  const {
    nextUrl: { search },
  } = req;
  const urlSearchParams = new URLSearchParams(search);
  const skip = parseInt(urlSearchParams.get('skip') ?? '0');
  const take = Math.min(parseInt(urlSearchParams.get('take') ?? '10'), 100);
  const data = await getUrlsForUser(session.user.id, skip, take);

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  // Get Session Data
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.redirect('/dashboard');
  }
  try {
    //   Get Original url from the body
    const body = await req.json();
    const originalUrl = body['url'];

    //   Try to parse the url, will throw an exception if the url is not correct
    new URL(originalUrl);

    //   Create url object for the user
    const url = await createUrl(originalUrl, session);
    return NextResponse.json(url);
  } catch (err) {
    return NextResponse.json({ details: 'Invalid Url' }, { status: 400 });
  }
}
