import {
  getQuoteById,
  editQuote,
  removeQuoteById,
} from '@backend/usecase/quote';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { GetQuote, EditQuote, RemoveQuote } from './contract';

type RetrieveQuoteRequest = GetQuote['request'];
type RemoveQuoteRequest = RemoveQuote['request'];
type ChangeQuoteRequest = EditQuote['request'];
type ChangeQuoteRequestBody = EditQuote['request']['body'];

export async function retrieveQuoteById(
  _: NextRequest,
  { params: { id } }: RetrieveQuoteRequest
) {
  const response = await getQuoteById({
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

export async function changeQuoteDetail(
  req: NextRequest,
  { params: { id } }: ChangeQuoteRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: ChangeQuoteRequestBody = await req.json();

  const response = await editQuote({
    sessionToken: sessionToken?.value,
    id,
    data: {
      id,
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

export async function removeQuote(
  req: NextRequest,
  { params: { id } }: RemoveQuoteRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeQuoteById({
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
