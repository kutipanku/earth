import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/entity/author/type';
import type { AuthorForOne } from './types';
import { normalizerForOne } from './normalizer';

export interface CreateOneProps {
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

interface Result {
  status: number;
  data: Author | null;
  error: string | null;
  errorFields?: string[];
}

export const createOne = async (props: CreateOneProps): Promise<Result> => {
  const { payload } = props;

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

  if (payload.dob) payload.dob = new Date(payload.dob).toISOString();
  if (payload.description_en) payload.description_en = payload.description_en;
  if (payload.description_id) payload.description_id = payload.description_id;
  if (payload.picture_url) payload.picture_url = payload.picture_url;
  if (payload.nationality_id) payload.nationality_id = payload.nationality_id;
  if (payload.profession_id) payload.profession_id = payload.profession_id;

  try {
    const author: AuthorForOne = await prisma.author.create({
      data,
      include: {
        nationality: true,
        profession: true,
      },
    });
    return { status: 201, data: normalizerForOne(author), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
