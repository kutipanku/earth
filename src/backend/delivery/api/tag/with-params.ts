import { NextRequest, NextResponse } from 'next/server';

import { getTagById, editTag, removeTagById } from '@/backend/usecase/tag';

interface Params {
  id: string;
}

export async function retrieveTagById(
  _: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const response = await getTagById({
    id,
  });

  return NextResponse.json(response);
}

export async function changeTagDetail(
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
    description_en,
    description_id,
    slug,
  }: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
    description_en?: string;
    description_id?: string;
  } = await req.json();

  const response = await editTag({
    sessionToken: sessionToken?.value,
    id,
    payload: {
      name_en,
      name_id,
      description_en,
      description_id,
      slug,
    },
  });

  return NextResponse.json(response);
}

export async function removeTag(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeTagById({
    id,
    sessionToken: sessionToken?.value,
  });

  return NextResponse.json(response);
}
