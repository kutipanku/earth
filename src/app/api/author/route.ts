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

  const {
    name,
    slug,
    dob,
    description_en,
    description_id,
    picture_url,
    nationality_id,
    profession_id,
  }: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = await req.json();

  if (!name || !slug) {
    return NextResponse.json(
      { error: 'Missing required key on body' },
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
    name,
    slug,
  };

  if (dob) payload.dob = dob;
  if (description_en) payload.description_en = description_en;
  if (description_id) payload.description_id = description_id;
  if (picture_url) payload.picture_url = picture_url;
  if (nationality_id) payload.nationality_id = nationality_id;
  if (profession_id) payload.profession_id = profession_id;

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
