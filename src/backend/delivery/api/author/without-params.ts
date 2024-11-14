import { NextRequest, NextResponse } from 'next/server';

import {
  addNewAuthor,
  getAuthors,
  getAuthorOptions,
} from '@/backend/usecase/author';

export async function retrieveAuthors(req: NextRequest) {
  const response = await getAuthors({
    page: req.nextUrl.searchParams.get('name'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response);
}

export async function addAuthor(req: NextRequest) {
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

export async function retrieveAuthorsAsOptions(req: NextRequest) {
  const response = await getAuthorOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response);
}
