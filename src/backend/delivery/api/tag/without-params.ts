import { NextRequest, NextResponse } from 'next/server';

import { addNewTag, getTags, getTagOptions } from '@/backend/usecase/tag';

export async function retrieveTags(req: NextRequest) {
  const response = await getTags({
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response);
}

export async function addTag(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
  } = await req.json();

  const response = await addNewTag({
    sessionToken: sessionToken?.value,
    payload: body,
  });

  return NextResponse.json(response);
}

export async function retrieveTagsAsOptions(req: NextRequest) {
  const response = await getTagOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response);
}
