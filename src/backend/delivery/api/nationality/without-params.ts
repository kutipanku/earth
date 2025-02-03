import {
  addNewNationality,
  getNationalities,
  getNationalityOptions,
} from '@backend/usecase/nationality';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList } from './normalizer';

import type {
  AddNationality,
  GetNationalities,
  GetNationalityOptions,
} from './contract';

type AddNationalityRequestBody = AddNationality['request']['body'];
type GetNationalityRequestSearchParams =
  GetNationalities['request']['search_params'];
type GetNationalityOptionsRequestSearchParams =
  GetNationalityOptions['request']['search_params'];

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

export async function addNationality(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddNationalityRequestBody = await req.json();

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

export async function retrieveNationalitiesAsOptions(req: NextRequest) {
  const searchParams: GetNationalityOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getNationalityOptions({
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
