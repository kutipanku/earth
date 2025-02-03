import {
  addNewProfession,
  getProfessions,
  getProfessionOptions,
} from '@backend/usecase/profession';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList } from './normalizer';

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

export async function retrieveProfessionsAsOptions(req: NextRequest) {
  const searchParams: GetProfessionOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getProfessionOptions({
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
