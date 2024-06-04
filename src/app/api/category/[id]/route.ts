import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const category = await prisma.category.findFirst({ where: { id } });
  return NextResponse.json({ status: 200, data: category });
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

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (category) {
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

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: payload,
    });

    // Tracker
    await prisma.log.capture({
      action: 'edit',
      entity: 'category',
      userId: currentUserId,
      dataId: updatedCategory.id,
      data: JSON.stringify(updatedCategory),
      dataOld: JSON.stringify(category),
    });

    return NextResponse.json({ status: 200, data: updatedCategory });
  } else {
    return NextResponse.json(
      { error: 'Unable to find category to edit' },
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

  const deletedCategory = await prisma.category.delete({
    where: {
      id: id,
    },
  });

  // Tracker
  await prisma.log.capture({
    action: 'delete',
    entity: 'category',
    userId: currentUserId,
    dataId: deletedCategory.id,
    data: JSON.stringify(deletedCategory),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ status: 200, data: deletedCategory });
}
