import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

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
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const nationality = await prisma.nationality.findUnique({
    where: {
      id,
    },
  });

  if (nationality) {
    const body: {
      name_en?: string;
      name_id?: string;
      flag?: string;
      slug?: string;
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
      flag?: string;
    } = {
      name_en: body.name_en,
      name_id: body.name_id,
      slug: body.slug,
    };
    if (body.flag) payload.flag = body.flag;

    const updatedNationality = await prisma.nationality.update({
      where: {
        id,
      },
      data: payload,
    });

    // Tracker
    await prisma.log.capture({
      action: 'edit',
      entity: 'nationality',
      userId: currentUserId,
      dataId: updatedNationality.id,
      data: JSON.stringify(updatedNationality),
      dataOld: JSON.stringify(nationality),
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
  const { id: currentUserId, isAuthorized } = await useAuthorization({ req });
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deletedNationality = await prisma.nationality.delete({
    where: {
      id: id,
    },
  });

  // Tracker
  await prisma.log.capture({
    action: 'delete',
    entity: 'nationality',
    userId: currentUserId,
    dataId: deletedNationality.id,
    data: JSON.stringify(deletedNationality),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ status: 200, data: deletedNationality });
}
