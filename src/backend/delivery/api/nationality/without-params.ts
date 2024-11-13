import { NextRequest, NextResponse } from 'next/server';

import addNewNationality from '@/backend/usecase/nationality/add-new-nationality';
import getNationalities from '@/backend/usecase/nationality/get-nationalities';
import getNationalityOptions from '@/backend/usecase/nationality/get-nationality-options';

export async function retrieveNationalities(req: NextRequest) {
  const response = await getNationalities({
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response);
}

export async function addNationality(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
  } = await req.json();

  const response = await addNewNationality({
    sessionToken: sessionToken?.value,
    payload: body,
  });

  return NextResponse.json(response);
}

export async function retrieveNationalitiesAsOptions(req: NextRequest) {
  const response = await getNationalityOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response);
}
