import { NextRequest, NextResponse } from 'next/server';

import {
  addNewAuthor,
  getAuthors,
  getAuthorOptions,
} from '@/backend/usecase/author';

export async function retrieveAuthors(req: NextRequest) {
  const response = await getAuthors({
    page: Number(req.nextUrl.searchParams.get('page')),
    limit: Number(req.nextUrl.searchParams.get('limit')),
    filter_name: req.nextUrl.searchParams.get('name') || '',
    filter_slug: req.nextUrl.searchParams.get('slug') || '',
  });

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
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
    data: body,
  });

  if (response.error) {
    return NextResponse.json(
      {
        success: false,
        message: response.error,
        data: { fields: response.fields },
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
}

export async function retrieveAuthorsAsOptions(req: NextRequest) {
  const response = await getAuthorOptions({
    name: req.nextUrl.searchParams.get('name') || '',
  });

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
}
