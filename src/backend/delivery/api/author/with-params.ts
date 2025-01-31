import { NextRequest, NextResponse } from 'next/server';

import {
  getAuthorById,
  editAuthor,
  removeAuthorById,
} from '@/backend/usecase/author';

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

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
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
    data: {
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

  if (response.error) {
    return NextResponse.json(
      {
        success: false,
        message: response.error,
        data: { fields: response.fields },
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
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

  if (response.error) {
    return NextResponse.json(
      {
        success: false,
        message: response.error,
        data: null,
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
}
