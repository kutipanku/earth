import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

export async function GET(req: NextRequest) {
  const filterName = req.nextUrl.searchParams.get('name');
  const filterSlug = req.nextUrl.searchParams.get('slug');

  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  const nationalities = await prisma.nationality.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filterName && {
        OR: [
          { name_en: { contains: filterName, mode: 'insensitive' } },
          { name_id: { contains: filterName, mode: 'insensitive' } },
        ],
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  const count = await prisma.nationality.count({
    where: {
      ...(filterName && {
        OR: [
          { name_en: { contains: filterName, mode: 'insensitive' } },
          { name_id: { contains: filterName, mode: 'insensitive' } },
        ],
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  return NextResponse.json({ data: nationalities, total: count });
}

export async function POST(req: NextRequest) {
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    name_en,
    name_id,
    flag,
    slug,
  }: {
    name_en?: string;
    name_id?: string;
    flag?: string;
    slug?: string;
  } = await req.json();

  if (!name_en || !name_id || !slug) {
    return NextResponse.json(
      { error: 'Missing required key on body' },
      { status: 400 }
    );
  }

  const nationality = await prisma.nationality.create({
    data: {
      name_en,
      name_id,
      slug,
      flag,
    },
  });

  // Tracker
  await prisma.log.capture({
    action: 'add',
    entity: 'nationality',
    userId: currentUserId,
    dataId: nationality.id,
    data: JSON.stringify(nationality),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ data: nationality });
}
