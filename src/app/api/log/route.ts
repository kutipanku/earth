import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

export async function GET(req: NextRequest) {
  const filterName = req.nextUrl.searchParams.get('name');
  const filterAction = req.nextUrl.searchParams.get('action');
  const filterEntity = req.nextUrl.searchParams.get('entity');

  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  const logs = await prisma.log.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: true,
    },
    where: {
      ...(filterName && {
        user: {
          name: { contains: filterName, mode: 'insensitive' },
        },
      }),
      ...(filterAction && {
        action: { contains: filterAction, mode: 'insensitive' },
      }),
      ...(filterEntity && {
        entity: { contains: filterEntity, mode: 'insensitive' },
      }),
    },
  });

  const count = await prisma.log.count({
    where: {
      ...(filterName && {
        user: {
          name: { contains: filterName, mode: 'insensitive' },
        },
      }),
      ...(filterAction && {
        action: { contains: filterAction, mode: 'insensitive' },
      }),
      ...(filterEntity && {
        entity: { contains: filterEntity, mode: 'insensitive' },
      }),
    },
  });

  return NextResponse.json({ data: logs, total: count });
}
