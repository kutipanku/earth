import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const log = await prisma.log.findFirst({ where: { id } });
  return NextResponse.json({ status: 200, data: log });
}
