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

export async function retrieveCategoryById(
  _: NextRequest,
  { params: { id } }: RetrieveCategoryRequest
) {
  const response = await getCategoryById({
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
