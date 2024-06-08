import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import useAuthorization from '@/usecase/useAuthorization';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const quote = await prisma.quote.findFirst({ where: { id } });
  return NextResponse.json({ status: 200, data: quote });
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

  const quote = await prisma.quote.findUnique({
    where: {
      id,
    },
  });

  if (quote) {
    const body: {
      slug?: string;
      content_en?: string;
      content_id?: string;
      image_id_url?: string;
      image_en_url?: string;
      author_id?: string;
      description_en?: string;
      description_id?: string;
      category_id?: string;
    } = await req.json();

    type BodyKey = keyof typeof body;
    const requiredFields: BodyKey[] = ['slug'];

    const errorFields = requiredFields.filter((key) => !body[key]);

    if (errorFields.length || !body.slug) {
      return NextResponse.json(
        {
          error: `Missing ${errorFields.join(', ')} on body`,
          fields: errorFields,
        },
        { status: 400 }
      );
    }

    const payload: {
      slug: string;
      content_en?: string;
      content_id?: string;
      image_id_url?: string;
      image_en_url?: string;
      author_id?: string;
      description_en?: string;
      description_id?: string;
      category_id?: string;
    } = {
      slug: body.slug,
    };
  
    if (body.content_en) payload.content_en = body.content_en;
    if (body.content_id) payload.content_id = body.content_id;
    if (body.description_en) payload.description_en = body.description_en;
    if (body.description_id) payload.description_id = body.description_id;
    if (body.image_en_url) payload.image_en_url = body.image_en_url;
    if (body.image_id_url) payload.image_id_url = body.image_id_url;
    if (body.author_id) payload.author_id = body.author_id;
    if (body.category_id) payload.category_id = body.category_id;

    const updatedQuote = await prisma.quote.update({
      where: {
        id,
      },
      data: payload,
    });

    // Tracker
    await prisma.log.capture({
      action: 'edit',
      entity: 'quote',
      userId: currentUserId,
      dataId: updatedQuote.id,
      data: JSON.stringify(updatedQuote),
      dataOld: JSON.stringify(quote),
    });

    return NextResponse.json({ status: 200, data: updatedQuote });
  } else {
    return NextResponse.json(
      { error: 'Unable to find quote to edit' },
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

  const deletedQuote = await prisma.quote.delete({
    where: {
      id: id,
    },
  });

  // Tracker
  await prisma.log.capture({
    action: 'delete',
    entity: 'quote',
    userId: currentUserId,
    dataId: deletedQuote.id,
    data: JSON.stringify(deletedQuote),
    dataOld: JSON.stringify({}),
  });

  return NextResponse.json({ status: 200, data: deletedQuote });
}
