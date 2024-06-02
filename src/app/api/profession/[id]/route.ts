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
    const body: {
      name_en?: string;
      name_id?: string;
      flag?: string;
      slug?: string;
      icon?: string;
    } = await req.json();

    type BodyKey = keyof typeof body;
    const requiredFields: BodyKey[] = ['name_en', 'name_id', 'slug'];

    const errorFields = requiredFields.filter((key) => !body[key]);

    if (errorFields.length || !body.name_en || !body.name_id || !body.slug) {
      return NextResponse.json(
        {
          error: `Missing ${errorFields.join(', ')} on body`,
          fields: errorFields,
        },
        { status: 400 }
      );
    }

    const payload: {
      name_en?: string;
      name_id?: string;
      slug?: string;
      icon?: string;
    } = {
      name_en: body.name_en,
      name_id: body.name_id,
      slug: body.slug,
    };

    if (body.icon) payload.icon = body.icon;

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
