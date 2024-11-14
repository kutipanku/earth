import { NextRequest, NextResponse } from 'next/server';

import getAuthorById from '@/backend/usecase/author/get-author-by-id';
import editAuthor from '@/backend/usecase/author/edit-author';
import removeAuthorById from '@/backend/usecase/author/remove-author-by-id';

interface Params {
  id: string;
}

export async function retrieveAuthorById(
  _: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const response = await getAuthorById({
    id,
  });

  return NextResponse.json(response);
}

export async function changeAuthorDetail(
  req: NextRequest,
  { params }: { params: Params }
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const { id } = params;
  const {
    name,
    slug,
    dob,
    description_en,
    description_id,
    picture_url,
    nationality_id,
    profession_id,
  }: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = await req.json();

  const response = await editAuthor({
    sessionToken: sessionToken?.value,
    id,
    payload: {
      name,
      slug,
      dob,
      description_en,
      description_id,
      picture_url,
      nationality_id,
      profession_id,
    },
  });

  return NextResponse.json(response);
}

export async function removeAuthor(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeAuthorById({
    id,
    sessionToken: sessionToken?.value,
  });

  return NextResponse.json(response);
}
