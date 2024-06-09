import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

export async function GET(req: NextRequest) {
  const filterName = req.nextUrl.searchParams.get('name');
  const filterSlug = req.nextUrl.searchParams.get('slug');

  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  const authors = await prisma.author.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filterName && {
        name: { contains: filterName, mode: 'insensitive' },
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
    include: {
      nationality: {
        select: {
          id: true,
          name_en: true,
        },
      },
      profession: {
        select: {
          id: true,
          name_en: true,
        },
      },
    },
  });

  const count = await prisma.author.count({
    where: {
      ...(filterName && {
        name: { contains: filterName, mode: 'insensitive' },
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  return NextResponse.json({ data: authors, total: count });
}

export async function POST(req: NextRequest) {
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = await req.json();

  type BodyKey = keyof typeof body;
  const requiredFields: BodyKey[] = ['name', 'slug'];

  const errorFields = requiredFields.filter((key) => !body[key]);

  if (errorFields.length || !body.name || !body.slug) {
    return NextResponse.json(
      {
        error: `Missing ${errorFields.join(', ')} on body`,
        fields: errorFields,
      },
      { status: 400 }
    );
  }

  const payload: {
    name: string;
    slug: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = {
    name: body.name,
    slug: body.slug,
  };

  if (body.dob) payload.dob = new Date(body.dob).toISOString();
  if (body.description_en) payload.description_en = body.description_en;
  if (body.description_id) payload.description_id = body.description_id;
  if (body.picture_url) payload.picture_url = body.picture_url;
  if (body.nationality_id) payload.nationality_id = body.nationality_id;
  if (body.profession_id) payload.profession_id = body.profession_id;

  const author = await prisma.author.create({
    data: payload,
  });

  // Tracker
  await prisma.log.capture({
    action: 'add',
    entity: 'author',
    userId: currentUserId,
    dataId: author.id,
    data: JSON.stringify(author),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ data: author });
}
