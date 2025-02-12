import {
  addNewAuthor,
  getAuthors,
  getAuthorOptions,
} from '@backend/usecase/author';
import { NextRequest, NextResponse } from '../../lib/next';
import {
  normalizeForList,
  normalizeOne,
  normalizeForOption,
} from './normalizer';

import type { AddAuthor, GetAuthorOptions, GetAuthors } from './contract';

type AddAuthorRequestBody = AddAuthor['request']['body'];
type GetAuthorRequestSearchParams = GetAuthors['request']['search_params'];
type GetAuthorOptionsRequestSearchParams =
  GetAuthorOptions['request']['search_params'];

type AddAuthorResponse = AddAuthor['response'];
type GetAuthorsResponse = GetAuthors['response'];
type GetAuthorOptionsResponse = GetAuthorOptions['response'];

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
    name: searchParams.name,
    slug: searchParams.slug,
  });

  const processedResponse: GetAuthorsResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
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

  const processedResponse: AddAuthorResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function retrieveAuthorsAsOptions(req: NextRequest) {
  const searchParams: GetAuthorOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getAuthorOptions({
    name: searchParams.name,
    page: 0,
    limit: 100,
    slug: null,
  });

  const processedResponse: GetAuthorOptionsResponse = {
    success: response.success,
    message: response.error,
    data: normalizeForOption(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
