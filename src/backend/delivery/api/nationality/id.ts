import { NextRequest, NextResponse } from 'next/server';

import getNationalityById from '@/backend/usecase/nationality/get-nationality-by-id';
import editNationality from '@/backend/usecase/nationality/edit-nationality';
import removeNationalityById from '@/backend/usecase/nationality/remove-nationality-by-id';

interface Params {
  id: string;
}

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  const response = await getNationalityById({
    id,
  });

  return NextResponse.json(response);
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const { id } = params;
  const {
    name_en,
    name_id,
    flag,
    slug,
  }: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
  } = await req.json();

  const response = await editNationality({
    sessionToken: sessionToken?.value,
    id,
    payload: {
      name_en,
      name_id,
      flag,
      slug,
    },
  });

  return NextResponse.json(response);
}

export async function DELETE(
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

  return NextResponse.json(response);
}
