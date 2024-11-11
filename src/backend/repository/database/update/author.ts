import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/repository/lib/prisma-types';

export interface UpdateOneProps {
  id: string;
  payload: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  };
}

export const updateOne = async (props: UpdateOneProps) => {
  const { id, payload } = props;

  const author: Author | null = await prisma.author.findUnique({
    where: {
      id,
    },
  });

  if (!author || author === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find author to edit',
      errorFields: [],
    };

  type BodyKey = keyof typeof payload;
  const requiredFields: BodyKey[] = ['name', 'slug'];

  const errorFields = requiredFields.filter((key) => !payload[key]);

  if (errorFields.length || !payload.name || !payload.slug) {
    return {
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      errorFields,
    };
  }

  const data: {
    name: string;
    slug: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = {
    name: payload.name,
    slug: payload.slug,
  };

  if (payload.dob) data.dob = new Date(payload.dob).toISOString();
  if (payload.description_en) data.description_en = payload.description_en;
  if (payload.description_id) data.description_id = payload.description_id;
  if (payload.picture_url) data.picture_url = payload.picture_url;
  if (payload.nationality_id) data.nationality_id = payload.nationality_id;
  if (payload.profession_id) data.profession_id = payload.profession_id;

  try {
    const updatedAuthor = await prisma.author.update({
      where: {
        id,
      },
      data,
    });

    return {
      status: 200,
      data: { new: updatedAuthor, old: author },
      error: null,
      errorFields,
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: JSON.stringify(error),
      errorFields,
    };
  }
};
