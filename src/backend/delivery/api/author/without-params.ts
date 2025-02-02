import {
  addNewAuthor,
  getAuthors,
  getAuthorOptions,
} from '@backend/usecase/author';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList } from './normalizer';

import type { AddAuthor, GetAuthorOptions, GetAuthors } from './contract';

type AddAuthorRequestBody = AddAuthor['request']['body'];
type GetAuthorRequestSearchParams = GetAuthors['request']['search_params'];
type GetAuthorOptionsRequestSearchParams =
  GetAuthorOptions['request']['search_params'];

export async function retrieveAuthors(req: NextRequest) {
  const searchParams: GetAuthorRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    name: req.nextUrl.searchParams.get('name'),
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const response = await getAuthors({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    filter_name: searchParams.name,
    filter_slug: searchParams.slug,
  });

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        list: normalizeForList(response.data.list),
        total: response.data.total,
      },
    },
    { status: 200 }
  );
}

export async function addAuthor(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddAuthorRequestBody = await req.json();

  const response = await addNewAuthor({
    sessionToken: sessionToken?.value,
    data: {
      id: '',
      name: body.name,
      slug: body.slug,
      dob: body.dob ? new Date(body.dob) : null,
      description: {
        eng: body.description?.eng || null,
        ind: body.description?.ind || null,
      },
      picture_url: body.picture_url || null,
      ids: {
        nationality_id: body.nationality_id,
        profession_id: body.profession_id,
      },
      nationality: null,
      profession: null,
      metadata: null,
    },
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
  const searchParams: GetAuthorOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getAuthorOptions({
    name: searchParams.name,
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
