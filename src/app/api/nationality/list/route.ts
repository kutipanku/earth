import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 1;
  const limit = req.nextUrl.searchParams.get('limit') || 100;

  const nationalities = await prisma.nationality.findMany({
    orderBy: {
      name_en: 'asc',
      name_id: 'asc',
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  return NextResponse.json(
    nationalities.map((nationality) => ({
      id: nationality.id,
      name_en: nationality.name_en,
      name_id: nationality.name_id,
    }))
  );
}
