import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

export async function GET(req: NextRequest) {
  const filterContent = req.nextUrl.searchParams.get('content');
  const filterDescription = req.nextUrl.searchParams.get('description');
  const filterSlug = req.nextUrl.searchParams.get('slug');

  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  const quotes = await prisma.quote.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filterContent && {
        OR: [
          { content_en: { contains: filterContent, mode: 'insensitive' } },
          { content_id: { contains: filterContent, mode: 'insensitive' } },
        ],
      }),
      ...(filterDescription && {
        OR: [
          { description_en: { contains: filterDescription, mode: 'insensitive' } },
          { description_id: { contains: filterDescription, mode: 'insensitive' } },
        ],
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  const count = await prisma.quote.count({
    where: {
      ...(filterContent && {
        OR: [
          { content_en: { contains: filterContent, mode: 'insensitive' } },
          { content_id: { contains: filterContent, mode: 'insensitive' } },
        ],
      }),
      ...(filterDescription && {
        OR: [
          { description_en: { contains: filterDescription, mode: 'insensitive' } },
          { description_id: { contains: filterDescription, mode: 'insensitive' } },
        ],
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  return NextResponse.json({ data: quotes, total: count });
}

export async function POST(req: NextRequest) {
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: {
    slug?: string;
    content_en?: string;
    content_id?: string;
    image_id_url?: string;
    image_en_url?: string;
    author_id?: string;
    description_en?: string;
    description_id?: string;
    category_id?: string;
  } = await req.json();

  type BodyKey = keyof typeof body;
  const requiredFields: BodyKey[] = ['slug'];

  const errorFields = requiredFields.filter((key) => !body[key]);

  if (errorFields.length || !body.slug) {
    return NextResponse.json(
      {
        error: `Missing ${errorFields.join(', ')} on body`,
        fields: errorFields,
      },
      { status: 400 }
    );
  }

  const payload: {
    slug: string;
    content_en?: string;
    content_id?: string;
    image_id_url?: string;
    image_en_url?: string;
    author_id?: string;
    description_en?: string;
    description_id?: string;
    category_id?: string;
  } = {
    slug: body.slug,
  };

  if (body.content_en) payload.content_en = body.content_en;
  if (body.content_id) payload.content_id = body.content_id;
  if (body.description_en) payload.description_en = body.description_en;
  if (body.description_id) payload.description_id = body.description_id;
  if (body.image_en_url) payload.image_en_url = body.image_en_url;
  if (body.image_id_url) payload.image_id_url = body.image_id_url;
  if (body.author_id) payload.author_id = body.author_id;
  if (body.category_id) payload.category_id = body.category_id;

  const quote = await prisma.quote.create({
    data: payload,
  });

  // Tracker
  await prisma.log.capture({
    action: 'add',
    entity: 'quote',
    userId: currentUserId,
    dataId: quote.id,
    data: JSON.stringify(quote),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ data: quote });
}
