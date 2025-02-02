import {
  getAuthorById,
  editAuthor,
  removeAuthorById,
} from '@/backend/usecase/author';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { GetAuthor, EditAuthor, RemoveAuthor } from './contract';

type RetrieveAuthorRequest = GetAuthor['request'];
type RemoveAuthorRequest = RemoveAuthor['request'];
type ChangeAuthorRequest = EditAuthor['request'];
type ChangeAuthorRequestBody = EditAuthor['request']['body'];

export async function retrieveAuthorById(
  _: NextRequest,
  { params: { id } }: RetrieveAuthorRequest
) {
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
    { success: true, data: normalizeOne(response.data) },
    { status: 200 }
  );
}

export async function changeAuthorDetail(
  req: NextRequest,
  { params: { id } }: ChangeAuthorRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: ChangeAuthorRequestBody = await req.json();

  const response = await editAuthor({
    sessionToken: sessionToken?.value,
    id,
    data: {
      id,
      name: body.name,
      slug: body.slug,
      dob: body.dob ? new Date(body.dob) : null,
      description: {
        eng: body.description?.eng || null,
        ind: body.description?.ind || null,
      },
      picture_url: body.picture_url || null,
      ids: {
        nationality_id: body.nationality_id,
        profession_id: body.profession_id,
      },
      nationality: null,
      profession: null,
      metadata: null,
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
  { params: { id } }: RemoveAuthorRequest
) {
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
