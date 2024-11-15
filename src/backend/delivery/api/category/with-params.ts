import { NextRequest, NextResponse } from 'next/server';

import {
  getCategoryById,
  editCategory,
  removeCategoryById,
} from '@/backend/usecase/category';

interface Params {
  id: string;
}

export async function retrieveCategoryById(
  _: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const response = await getCategoryById({
    id,
  });

  return NextResponse.json(response);
}

export async function changeCategoryDetail(
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

  const response = await editCategory({
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

export async function removeCategory(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeCategoryById({
    id,
    sessionToken: sessionToken?.value,
  });

  return NextResponse.json(response);
}
