import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/entity/author/type';
import type { AuthorForOne, UpdateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: {
    new: Author | null;
    old: Author | null;
  } | null;
  error: string | null;
  errorFields?: string[];
}

export const updateOne = async (props: UpdateOneProps): Promise<Result> => {
  const { id, payload } = props;

  const author: AuthorForOne | null = await prisma.author.findUnique({
    where: {
      id,
    },
    include: {
      nationality: true,
      profession: true,
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
    const updatedAuthor: AuthorForOne = await prisma.author.update({
      where: {
        id,
      },
      include: {
        nationality: true,
        profession: true,
      },
      data,
    });

    return {
      status: 200,
      data: {
        new: normalizerForOne(updatedAuthor),
        old: normalizerForOne(author),
      },
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
