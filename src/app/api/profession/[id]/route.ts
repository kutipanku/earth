import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const profession = await prisma.profession.findFirst({ where: { id } });
  return NextResponse.json({ status: 200, data: profession });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const profession = await prisma.profession.findUnique({
    where: {
      id,
    },
  });

  if (profession) {
    const { name_en, name_id, slug, icon } = await req.json();

    const payload: {
      name_en?: string;
      name_id?: string;
      slug?: string;
      icon?: string;
    } = {
      name_en,
      name_id,
    };

    if (slug) payload.slug = slug;
    if (icon) payload.icon = icon;

    const updatedProfession = await prisma.profession.update({
      where: {
        id,
      },
      data: payload,
    });

    return NextResponse.json({ status: 200, data: updatedProfession });
  } else {
    return NextResponse.json(
      { error: 'Unable to find profession to edit' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deletedProfession = await prisma.profession.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200, data: deletedProfession });
}
