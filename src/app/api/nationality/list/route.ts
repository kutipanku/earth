import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const filterName = req.nextUrl.searchParams.get('name');
  const page = req.nextUrl.searchParams.get('page') || 0;
  const limit = req.nextUrl.searchParams.get('limit') || 100;

  const nationalities = await prisma.nationality.findMany({
    orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
    skip: Number(page) * Number(limit),
    take: Number(limit),
    where: {
      ...(filterName && {
        OR: [
          { name_en: { contains: filterName, mode: 'insensitive' } },
          { name_id: { contains: filterName, mode: 'insensitive' } },
        ],
      }),
    },
  });

  return NextResponse.json({
    status: 200,
    data: nationalities.map((nationality) => ({
      id: nationality.id,
      name_en: nationality.name_en,
      name_id: nationality.name_id,
    })),
  });
}
