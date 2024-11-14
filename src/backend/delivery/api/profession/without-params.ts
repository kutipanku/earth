import { NextRequest, NextResponse } from 'next/server';

import {
  addNewProfession,
  getProfessions,
  getProfessionOptions,
} from '@/backend/usecase/profession';

export async function retrieveProfessions(req: NextRequest) {
  const response = await getProfessions({
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response);
}

export async function addProfession(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
  } = await req.json();

  const response = await addNewProfession({
    sessionToken: sessionToken?.value,
    payload: body,
  });

  return NextResponse.json(response);
}

export async function retrieveProfessionsAsOptions(req: NextRequest) {
  const response = await getProfessionOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response);
}
