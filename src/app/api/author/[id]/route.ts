import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const author = await prisma.author.findFirst({ where: { id } });
  return NextResponse.json({ status: 200, data: author });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const author = await prisma.author.findUnique({
    where: {
      id,
    },
  });

  if (author) {
    const {
      name,
      slug,
      dob,
      description_en,
      description_id,
      picture_url,
      nationality_id,
      profession_id,
    }: {
      name?: string;
      slug?: string;
      dob?: string;
      description_en?: string;
      description_id?: string;
      picture_url?: string;
      nationality_id?: string;
      profession_id?: string;
    } = await req.json();

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Missing required key on body' },
        { status: 400 }
      );
    }

    const payload: {
      name: string;
      slug: string;
      dob?: string;
      description_en?: string;
      description_id?: string;
      picture_url?: string;
      nationality_id?: string;
      profession_id?: string;
    } = {
      name,
      slug,
    };

    if (dob) payload.dob = dob;
    if (description_en) payload.description_en = description_en;
    if (description_id) payload.description_id = description_id;
    if (picture_url) payload.picture_url = picture_url;
    if (nationality_id) payload.nationality_id = nationality_id;
    if (profession_id) payload.profession_id = profession_id;

    const updatedAuthor = await prisma.author.update({
      where: {
        id,
      },
      data: payload,
    });

    return NextResponse.json({ status: 200, data: updatedAuthor });
  } else {
    return NextResponse.json(
      { error: 'Unable to find author to edit' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deletedAuthor = await prisma.author.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200, data: deletedAuthor });
}
