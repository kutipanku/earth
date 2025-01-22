import { NextRequest, NextResponse } from 'next/server';

import {
  addNewProfession,
  getProfessions,
  getProfessionOptions,
} from '@backend/usecase/profession';
import type { AddProfession } from './contract';

export async function retrieveProfessions(req: NextRequest) {
  const response = await getProfessions({
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response[0]);
}

export async function addProfession(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddProfession = await req.json();

  const normalizedBody = {
    name_en: body.name?.eng,
    name_id: body.name?.ind,
    icon: body.icon,
    slug: body.slug,
  };

  const response = await addNewProfession({
    sessionToken: sessionToken?.value,
    payload: normalizedBody,
  });

  return NextResponse.json(response[0]);
}

export async function retrieveProfessionsAsOptions(req: NextRequest) {
  const response = await getProfessionOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response[0]);
}
