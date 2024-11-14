import { NextRequest, NextResponse } from 'next/server';

import {
  getProfessionById,
  editProfession,
  removeProfessionById,
} from '@/backend/usecase/profession';

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

  return NextResponse.json(response);
}

export async function changeProfessionDetail(
  req: NextRequest,
  { params }: { params: Params }
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const { id } = params;
  const {
    name_en,
    name_id,
    icon,
    slug,
  }: {
    name_en?: string;
    name_id?: string;
    icon?: string;
    slug?: string;
  } = await req.json();

  const response = await editProfession({
    sessionToken: sessionToken?.value,
    id,
    payload: {
      name_en,
      name_id,
      icon,
      slug,
    },
  });

  return NextResponse.json(response);
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

  return NextResponse.json(response);
}
