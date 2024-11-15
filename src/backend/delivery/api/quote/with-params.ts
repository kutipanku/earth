import { NextRequest, NextResponse } from 'next/server';

import {
  getQuoteById,
  editQuote,
  removeQuoteById,
} from '@/backend/usecase/quote';

interface Params {
  id: string;
}

export async function retrieveQuoteById(
  _: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  const response = await getQuoteById({
    id,
  });

  return NextResponse.json(response);
}

export async function changeQuoteDetail(
  req: NextRequest,
  { params }: { params: Params }
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const { id } = params;
  const {
    slug,
    content_id,
    content_en,
    description_en,
    description_id,
    image_id_url,
    image_en_url,
    author_id,
    category_id,
    tag_ids,
  }: {
    slug?: string;
    content_id?: string;
    content_en?: string;
    description_en?: string;
    description_id?: string;
    image_id_url?: string;
    image_en_url?: string;
    author_id?: string;
    category_id?: string;
    tag_ids?: string;
  } = await req.json();

  const response = await editQuote({
    sessionToken: sessionToken?.value,
    id,
    payload: {
      slug,
      content_id,
      content_en,
      description_en,
      description_id,
      image_id_url,
      image_en_url,
      author_id,
      category_id,
      tag_ids,
    },
  });

  return NextResponse.json(response);
}

export async function removeQuote(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeQuoteById({
    id,
    sessionToken: sessionToken?.value,
  });

  return NextResponse.json(response);
}
