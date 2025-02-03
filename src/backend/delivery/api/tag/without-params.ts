import { addNewTag, getTags, getTagOptions } from '@backend/usecase/tag';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList } from './normalizer';

import type { AddTag, GetTags, GetTagOptions } from './contract';

type AddTagRequestBody = AddTag['request']['body'];
type GetTagRequestSearchParams = GetTags['request']['search_params'];
type GetTagOptionsRequestSearchParams =
  GetTagOptions['request']['search_params'];

export async function retrieveTags(req: NextRequest) {
  const searchParams: GetTagRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    name: req.nextUrl.searchParams.get('name'),
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const response = await getTags({
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

export async function addTag(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddTagRequestBody = await req.json();

  const response = await addNewTag({
    sessionToken: sessionToken?.value,
    data: {
      id: '',
      name: body.name,
      slug: body.slug,
      description: body.description,
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

export async function retrieveTagsAsOptions(req: NextRequest) {
  const searchParams: GetTagOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getTagOptions({
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
