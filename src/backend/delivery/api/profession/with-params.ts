import { NextRequest, NextResponse } from 'next/server';

import {
  getProfessionById,
  editProfession,
  removeProfessionById,
} from '@backend/usecase/profession';
import type { EditProfession } from './contract';

interface Params {
  id: string;
}

export async function retrieveProfessionById(
  _: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const response = await getProfessionById({
    id,
  });

  return NextResponse.json(response[0]);
}

export async function changeProfessionDetail(
  req: NextRequest,
  { params }: { params: Params }
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const { id } = params;
  const body: EditProfession = await req.json();

  const payload: {
    name_en?: string;
    name_id?: string;
    icon?: string;
    slug?: string;
  } = {};

  if (body.icon) payload.icon = body.icon;
  if (body.slug) payload.slug = body.slug;
  if (body.name) {
    if (body.name.eng) payload.name_en = body.name.eng;
    if (body.name.eng) payload.name_id = body.name.eng;
  }

  const response = await editProfession({
    sessionToken: sessionToken?.value,
    id,
    payload,
  });

  return NextResponse.json(response[0]);
}

export async function removeProfession(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeProfessionById({
    id,
    sessionToken: sessionToken?.value,
  });

  return NextResponse.json(response[0]);
}
