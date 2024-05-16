import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const nationality = await prisma.nationality.findFirst({ where: { id } });
  return NextResponse.json({ status: 200, data: nationality });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const nationality = await prisma.nationality.findUnique({
    where: {
      id,
    },
  });

  if (nationality) {
    const { name_en, name_id, slug, flag } = await req.json();

    const payload: {
      name_en?: string;
      name_id?: string;
      slug?: string;
      flag?: string;
    } = {
      name_en,
      name_id,
    };

    if (slug) payload.slug = slug;
    if (flag) payload.flag = flag;

    const updatedNationality = await prisma.nationality.update({
      where: {
        id,
      },
      data: payload,
    });

    return NextResponse.json({ status: 200, data: updatedNationality });
  } else {
    return NextResponse.json(
      { error: 'Unable to find nationality to edit' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deleteOffice = await prisma.nationality.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200, data: deleteOffice });
}
