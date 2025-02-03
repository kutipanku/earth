import {
  addNewCategory,
  getCategories,
  getCategoryOptions,
} from '@/backend/usecase/category';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList } from './normalizer';

import type {
  AddCategory,
  GetCategories,
  GetCategoryOptions,
} from './contract';

type AddCategoryRequestBody = AddCategory['request']['body'];
type GetCategoryRequestSearchParams = GetCategories['request']['search_params'];
type GetCategoryOptionsRequestSearchParams =
  GetCategoryOptions['request']['search_params'];

export async function retrieveCategories(req: NextRequest) {
  const searchParams: GetCategoryRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    name: req.nextUrl.searchParams.get('name'),
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const response = await getCategories({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    filter_name: searchParams.name,
    filter_slug: searchParams.slug,
  });

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        list: normalizeForList(response.data.list),
        total: response.data.total,
      },
    },
    { status: 200 }
  );
}

export async function addCategory(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddCategoryRequestBody = await req.json();

  const response = await addNewCategory({
    sessionToken: sessionToken?.value,
    data: {
      id: '',
      name: body.name,
      slug: body.slug,
      description: body.description,
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

export async function retrieveCategoriesAsOptions(req: NextRequest) {
  const searchParams: GetCategoryOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getCategoryOptions({
    name: searchParams.name,
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
