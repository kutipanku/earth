import { NextRequest, NextResponse } from 'next/server';

import {
  getNationalityById,
  editNationality,
  removeNationalityById,
} from '@/backend/usecase/nationality';
import type { EditNationality } from './contract';

interface Params {
  id: string;
}

export async function retrieveNationalityById(
  _: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const response = await getNationalityById({
    id,
  });

  return NextResponse.json(response[0]);
}

export async function changeNationalityDetail(
  req: NextRequest,
  { params }: { params: Params }
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const { id } = params;
  const body: EditNationality = await req.json();

  const payload: {
    flag?: string;
    slug?: string;
    name_en?: string;
    name_id?: string;
  } = {};
  if (body.flag) payload.flag = body.flag;
  if (body.slug) payload.slug = body.slug;
  if (body.name) {
    if (body.name.eng) payload.name_en = body.name.eng;
    if (body.name.eng) payload.name_id = body.name.eng;
  }

  const response = await editNationality({
    sessionToken: sessionToken?.value,
    id,
    payload,
  });

  return NextResponse.json(response[0]);
}

export async function removeNationality(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeNationalityById({
    id,
    sessionToken: sessionToken?.value,
  });

  return NextResponse.json(response[0]);
}
