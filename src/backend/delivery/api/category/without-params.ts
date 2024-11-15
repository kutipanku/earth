import { NextRequest, NextResponse } from 'next/server';

import {
  addNewCategory,
  getCategories,
  getCategoryOptions,
} from '@/backend/usecase/category';

export async function retrieveCategories(req: NextRequest) {
  const response = await getCategories({
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    filterName: req.nextUrl.searchParams.get('name'),
    filterSlug: req.nextUrl.searchParams.get('slug'),
  });

  return NextResponse.json(response);
}

export async function addCategory(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
  } = await req.json();

  const response = await addNewCategory({
    sessionToken: sessionToken?.value,
    payload: body,
  });

  return NextResponse.json(response);
}

export async function retrieveCategoriesAsOptions(req: NextRequest) {
  const response = await getCategoryOptions({
    name: req.nextUrl.searchParams.get('name'),
  });

  return NextResponse.json(response);
}
