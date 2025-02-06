import { NextRequest, NextResponse } from '../../lib/next';
import { addNewQuote, getQuotes } from '@/backend/usecase/quote';
import { normalizeForList } from './normalizer';

import type { AddQuote, GetQuotes } from './contract';

type AddQuoteRequestBody = AddQuote['request']['body'];
type GetQuoteRequestSearchParams = GetQuotes['request']['search_params'];

export async function retrieveQuotes(req: NextRequest) {
  const searchParams: GetQuoteRequestSearchParams = {
    page: req.nextUrl.searchParams.get('name'),
    limit: req.nextUrl.searchParams.get('limit'),
    filter_author: req.nextUrl.searchParams.get('filter_author'),
    filter_content: req.nextUrl.searchParams.get('filter_content'),
    filter_category: req.nextUrl.searchParams.get('filter_category'),
    filter_tag: req.nextUrl.searchParams.get('filter_tag'),
  };

  const response = await getQuotes({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    filter_author: searchParams.filter_author,
    filter_content: searchParams.filter_content,
    filter_category: searchParams.filter_category,
    filter_tag: searchParams.filter_tag,
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

  return NextResponse.json(response);
}
