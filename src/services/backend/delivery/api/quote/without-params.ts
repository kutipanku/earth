import { NextRequest, NextResponse } from '../../lib/next';
import { addNewQuote, getQuotes } from '@backend/usecase/quote';
import { normalizeForList, normalizeOne } from './normalizer';

import type { AddQuote, GetQuotes } from './contract';

type AddQuoteRequestBody = AddQuote['request']['body'];
type GetQuoteRequestSearchParams = GetQuotes['request']['search_params'];

type AddQuoteResponse = AddQuote['response'];
type GetQuotesResponse = GetQuotes['response'];

export async function retrieveQuotes(req: NextRequest) {
  const searchParams: GetQuoteRequestSearchParams = {
    page: req.nextUrl.searchParams.get('name'),
    limit: req.nextUrl.searchParams.get('limit'),
    author: req.nextUrl.searchParams.get('author'),
    content: req.nextUrl.searchParams.get('content'),
    category: req.nextUrl.searchParams.get('category'),
    tags: JSON.stringify(
      req.nextUrl.searchParams.get('tags') ?? '[]'
    ) as unknown as string[],
  };

  const response = await getQuotes({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    author: searchParams.author,
    content: searchParams.content,
    category: searchParams.category,
    tags: searchParams.tags,
  });

  const processedResponse: GetQuotesResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function addQuote(req: NextRequest) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: AddQuoteRequestBody = await req.json();

  const response = await addNewQuote({
    sessionToken: sessionToken?.value,
    data: {
      id: '',
      slug: body.slug,
      content: {
        eng: body.content?.eng || null,
        ind: body.content?.ind || null,
      },
      description: {
        eng: body.description?.eng || null,
        ind: body.description?.ind || null,
      },
      ids: {
        author_id: body.author_id,
        category_id: body.category_id,
        tags_id: JSON.parse(body.tags_id || '[]'),
      },
      url: {
        eng: null,
        ind: null,
      },
      author: null,
      category: null,
      tags: null,
      metadata: null,
    },
  });

  const processedResponse: AddQuoteResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
