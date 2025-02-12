import { addNewTag, getTags, getTagOptions } from '@backend/usecase/tag';
import { NextRequest, NextResponse } from '../../lib/next';
import {
  normalizeForList,
  normalizeOne,
  normalizeForOption,
} from './normalizer';

import type { AddTag, GetTags, GetTagOptions } from './contract';

type AddTagRequestBody = AddTag['request']['body'];
type GetTagRequestSearchParams = GetTags['request']['search_params'];
type GetTagOptionsRequestSearchParams =
  GetTagOptions['request']['search_params'];

type AddTagResponse = AddTag['response'];
type GetTagsResponse = GetTags['response'];
type GetTagOptionsResponse = GetTagOptions['response'];

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
    name: searchParams.name,
    slug: searchParams.slug,
  });

  const processedResponse: GetTagsResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
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

  const processedResponse: AddTagResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function retrieveTagsAsOptions(req: NextRequest) {
  const searchParams: GetTagOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getTagOptions({
    name: searchParams.name,
    page: 0,
    limit: 100,
    slug: null,
  });

  const processedResponse: GetTagOptionsResponse = {
    success: response.success,
    message: response.error,
    data: normalizeForOption(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
