import { getTagById, editTag, removeTagById } from '@backend/usecase/tag';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { EditTag, GetTag, RemoveTag } from './contract';

type RetrieveTagRequest = GetTag['request'];
type RemoveTagRequest = RemoveTag['request'];
type ChangeTagRequest = EditTag['request'];
type ChangeTagRequestBody = EditTag['request']['body'];

export async function retrieveTagById(
  _: NextRequest,
  { params: { id } }: RetrieveTagRequest
) {
  const response = await getTagById({
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

export async function changeTagDetail(
  req: NextRequest,
  { params: { id } }: ChangeTagRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: ChangeTagRequestBody = await req.json();

  const response = await editTag({
    sessionToken: sessionToken?.value,
    id,
    data: {
      id,
      name: {
        eng: body.name?.eng || null,
        ind: body.name?.ind || null,
      },
      description: {
        eng: body.description?.eng || null,
        ind: body.description?.ind || null,
      },
      slug: body.slug || '',
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

export async function removeTag(
  req: NextRequest,
  { params: { id } }: RemoveTagRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeTagById({
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
