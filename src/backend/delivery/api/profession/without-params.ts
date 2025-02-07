import {
  addNewProfession,
  getProfessions,
  getProfessionOptions,
} from '@backend/usecase/profession';
import { NextRequest, NextResponse } from '../../lib/next';
import {
  normalizeForList,
  normalizeOne,
  normalizeForOption,
} from './normalizer';

import type {
  AddProfession,
  GetProfessions,
  GetProfessionOptions,
} from './contract';

type AddProfessionRequestBody = AddProfession['request']['body'];
type GetProfessionRequestSearchParams =
  GetProfessions['request']['search_params'];
type GetProfessionOptionsRequestSearchParams =
  GetProfessionOptions['request']['search_params'];

type AddProfessionResponse = AddProfession['response'];
type GetProfessionsResponse = GetProfessions['response'];
type GetProfessionOptionsResponse = GetProfessionOptions['response'];

export async function retrieveProfessions(req: NextRequest) {
  const searchParams: GetProfessionRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    name: req.nextUrl.searchParams.get('name'),
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const response = await getProfessions({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    name: searchParams.name,
    slug: searchParams.slug,
  });

  const processedResponse: GetProfessionsResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function addProfession(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddProfessionRequestBody = await req.json();

  const response = await addNewProfession({
    sessionToken: sessionToken?.value,
    data: {
      id: '',
      name: body.name,
      slug: body.slug,
      icon: body.icon,
      metadata: null,
    },
  });

  const processedResponse: AddProfessionResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function retrieveProfessionsAsOptions(req: NextRequest) {
  const searchParams: GetProfessionOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getProfessionOptions({
    name: searchParams.name,
    page: 0,
    limit: 100,
    slug: null,
  });

  const processedResponse: GetProfessionOptionsResponse = {
    success: response.success,
    message: response.error,
    data: normalizeForOption(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
