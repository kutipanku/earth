import {
  getCategoryById,
  editCategory,
  removeCategoryById,
} from '@backend/usecase/category';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { EditCategory, GetCategory, RemoveCategory } from './contract';

type RetrieveCategoryRequest = GetCategory['request'];
type RemoveCategoryRequest = RemoveCategory['request'];
type ChangeCategoryRequest = EditCategory['request'];
type ChangeCategoryRequestBody = EditCategory['request']['body'];

type GetCategoryResponse = GetCategory['response'];
type EditCategoryResponse = EditCategory['response'];
type RemoveCategoryResponse = RemoveCategory['response'];

export async function retrieveCategoryById(
  _: NextRequest,
  { params }: RetrieveCategoryRequest
) {
  const response = await getCategoryById(params);

  const processedResponse: GetCategoryResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function changeCategoryDetail(
  req: NextRequest,
  { params: { id } }: ChangeCategoryRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: ChangeCategoryRequestBody = await req.json();

  const response = await editCategory({
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

  const processedResponse: EditCategoryResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function removeCategory(
  req: NextRequest,
  { params: { id } }: RemoveCategoryRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeCategoryById({
    id,
    sessionToken: sessionToken?.value,
  });

  const processedResponse: RemoveCategoryResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
