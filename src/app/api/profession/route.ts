import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const filterName = req.nextUrl.searchParams.get('name');
  const filterSlug = req.nextUrl.searchParams.get('slug');

  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  const professions = await prisma.profession.findMany({
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

  const count = await prisma.profession.count({
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

  return NextResponse.json({ data: professions, total: count });
}

export async function POST(req: Request) {
  const {
    name_en,
    name_id,
    icon,
    slug,
  }: {
    name_en?: string;
    name_id?: string;
    icon?: string;
    slug?: string;
  } = await req.json();

  if (!name_en || !name_id || !slug) {
    return NextResponse.json(
      { error: 'Missing required key on body' },
      { status: 400 }
    );
  }

  const profession = await prisma.profession.create({
    data: {
      name_en,
      name_id,
      slug,
      icon,
    },
  });

  return NextResponse.json({ data: profession });
}
