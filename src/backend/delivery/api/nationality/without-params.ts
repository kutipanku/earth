import { NextRequest, NextResponse } from 'next/server';

import {
  addNewNationality,
  getNationalities,
  getNationalityOptions,
} from '@/backend/usecase/nationality';

export async function retrieveNationalities(req: NextRequest) {
  const response = await getNationalities({
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response[0]);
}

export async function addNationality(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: {
    name?: {
      eng?: string;
      ind?: string;
    };
    flag?: string;
    slug?: string;
  } = await req.json();

  const normalizedBody = {
    name_en: body.name?.eng,
    name_id: body.name?.ind,
    flag: body.flag,
    slug: body.slug,
  };

  const response = await addNewNationality({
    sessionToken: sessionToken?.value,
    payload: normalizedBody,
  });

  return NextResponse.json(response[0]);
}

export async function retrieveNationalitiesAsOptions(req: NextRequest) {
  const response = await getNationalityOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response[0]);
}
