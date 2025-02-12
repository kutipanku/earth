import {
  addNewNationality,
  getNationalities,
  getNationalityOptions,
} from '@backend/usecase/nationality';
import { NextRequest, NextResponse } from '../../lib/next';
import {
  normalizeOne,
  normalizeForList,
  normalizeForOption,
} from './normalizer';

import type {
  AddNationality,
  GetNationalities,
  GetNationalityOptions,
} from './contract';

type GetNationalityRequestSearchParams =
  GetNationalities['request']['search_params'];
type GetNationalityOptionsRequestSearchParams =
  GetNationalityOptions['request']['search_params'];
type AddNationalityRequestBody = AddNationality['request']['body'];

type AddNationalityResponse = AddNationality['response'];
type GetNationalitiesResponse = GetNationalities['response'];
type GetNationalityOptionsResponse = GetNationalityOptions['response'];

export async function retrieveNationalities(req: NextRequest) {
  const searchParams: GetNationalityRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    name: req.nextUrl.searchParams.get('name'),
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const response = await getNationalities({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    name: searchParams.name,
    slug: searchParams.slug,
  });

  const processedResponse: GetNationalitiesResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function addNationality(req: NextRequest) {
  const body: AddNationalityRequestBody = await req.json();
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await addNewNationality({
    sessionToken: sessionToken?.value,
    data: {
      id: '',
      name: body.name,
      slug: body.slug,
      flag: body.flag,
      metadata: null,
    },
  });

  const processedResponse: AddNationalityResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function retrieveNationalitiesAsOptions(req: NextRequest) {
  const searchParams: GetNationalityOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getNationalityOptions({
    name: searchParams.name,
    page: 0,
    limit: 100,
    slug: null,
  });

  const processedResponse: GetNationalityOptionsResponse = {
    success: response.success,
    message: response.error,
    data: normalizeForOption(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
