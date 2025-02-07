import { getTagById, editTag, removeTagById } from '@backend/usecase/tag';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { EditTag, GetTag, RemoveTag } from './contract';

type RetrieveTagRequest = GetTag['request'];
type RemoveTagRequest = RemoveTag['request'];
type ChangeTagRequest = EditTag['request'];
type ChangeTagRequestBody = EditTag['request']['body'];

type GetTagResponse = GetTag['response'];
type EditTagResponse = EditTag['response'];
type RemoveTagResponse = RemoveTag['response'];

export async function retrieveTagById(
  _: NextRequest,
  { params }: RetrieveTagRequest
) {
  const response = await getTagById(params);

  const processedResponse: GetTagResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
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

  const processedResponse: EditTagResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
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

  const processedResponse: RemoveTagResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
