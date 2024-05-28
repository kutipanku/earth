import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

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
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    // Tracker
    await prisma.log.capture({
      action: 'edit',
      entity: 'profession',
      userId: currentUserId,
      dataId: updatedProfession.id,
      data: JSON.stringify(updatedProfession),
      dataOld: JSON.stringify(profession),
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
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const deletedProfession = await prisma.profession.delete({
    where: {
      id: id,
    },
  });

  // Tracker
  await prisma.log.capture({
    action: 'delete',
    entity: 'profession',
    userId: currentUserId,
    dataId: deletedProfession.id,
    data: JSON.stringify(deletedProfession),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ status: 200, data: deletedProfession });
}
