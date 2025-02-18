import {
  addNewCategory,
  getCategories,
  getCategoryOptions,
} from '@backend/usecase/category';
import { NextRequest, NextResponse } from '../../lib/next';
import {
  normalizeForList,
  normalizeOne,
  normalizeForOption,
} from './normalizer';

import type {
  AddCategory,
  GetCategories,
  GetCategoryOptions,
} from './contract';

type AddCategoryRequestBody = AddCategory['request']['body'];
type GetCategoryRequestSearchParams = GetCategories['request']['search_params'];
type GetCategoryOptionsRequestSearchParams =
  GetCategoryOptions['request']['search_params'];

type AddCategoryResponse = AddCategory['response'];
type GetCategoriesResponse = GetCategories['response'];
type GetCategoryOptionsResponse = GetCategoryOptions['response'];

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
    name: searchParams.name,
    slug: searchParams.slug,
  });

  const processedResponse: GetCategoriesResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
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

  const processedResponse: AddCategoryResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function retrieveCategoriesAsOptions(req: NextRequest) {
  const searchParams: GetCategoryOptionsRequestSearchParams = {
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getCategoryOptions({
    name: searchParams.name,
    page: 0,
    limit: 100,
    slug: null,
  });

  const processedResponse: GetCategoryOptionsResponse = {
    success: response.success,
    message: response.error,
    data: normalizeForOption(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
