import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || 1;
  const limit = req.nextUrl.searchParams.get('limit') || 100;

  const authors = await prisma.author.findMany({
    orderBy: {
      name: 'asc',
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  return NextResponse.json({
    status: 200,
    data: authors.map((author) => ({
      id: author.id,
      name_en: author.name,
      name_id: author.name,
    })),
  });
}
