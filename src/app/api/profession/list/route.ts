import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 1;
  const limit = req.nextUrl.searchParams.get('limit') || 100;

  const professions = await prisma.profession.findMany({
    orderBy: {
      name_en: 'asc',
      name_id: 'asc',
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  return NextResponse.json(
    professions.map((profession) => ({
      id: profession.id,
      name_en: profession.name_en,
      name_id: profession.name_id,
    }))
  );
}
