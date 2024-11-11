import { NextRequest, NextResponse } from 'next/server';

import addNewAuthor from '@/backend/usecase/author/add-new-author';
import getAuthors from '@/backend/usecase/author/get-authors';

export async function GET(req: NextRequest) {
  const response = await getAuthors({
    page: req.nextUrl.searchParams.get('name'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response);
}

export async function POST(req: NextRequest) {
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

  const response = await addNewAuthor({
    sessionToken: sessionToken?.value,
    payload: body,
  });

  return NextResponse.json(response);
}
