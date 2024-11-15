import { NextRequest, NextResponse } from 'next/server';

import { addNewQuote, getQuotes } from '@/backend/usecase/quote';

export async function retrieveQuotes(req: NextRequest) {
  const response = await getQuotes({
    page: req.nextUrl.searchParams.get('name'),
    limit: req.nextUrl.searchParams.get('limit'),
    filter_content_id: req.nextUrl.searchParams.get('filter_content_id'),
    filter_content_en: req.nextUrl.searchParams.get('filter_content_en'),
    filter_category_id: req.nextUrl.searchParams.get('filter_category_id'),
    filter_category_en: req.nextUrl.searchParams.get('filter_category_en'),
    filter_tag_id: req.nextUrl.searchParams.get('filter_tag_id'),
    filter_tag_en: req.nextUrl.searchParams.get('filter_tag_en'),
    filter_author: req.nextUrl.searchParams.get('filter_author'),
  });

  return NextResponse.json(response);
}

export async function addQuote(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = await req.json();

  const response = await addNewQuote({
    sessionToken: sessionToken?.value,
    payload: body,
  });

  return NextResponse.json(response);
}
