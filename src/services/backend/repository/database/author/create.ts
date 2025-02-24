import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Author } from '@backend/entity/author/type';
import type { ResultOne } from '../types';
import type { InputAuthorCreate, ResponseAuthorExtended } from './types';

type AuthorResultOne = ResultOne<Author>;

export const createOne = async (props: Author): Promise<AuthorResultOne> => {
  const payload: InputAuthorCreate = {
    data: {
      name: props.name,
      slug: props.slug,
      ...(props.dob && { dob: props.dob.toISOString() }),
      ...(props.description.eng && { description_eng: props.description.eng }),
      ...(props.description.ind && { description_ind: props.description.ind }),
      ...(props.picture_url && { picture_url: props.picture_url }),
      ...(props.ids?.profession_id && {
        profession_id: props.ids.profession_id,
      }),
      ...(props.ids?.nationality_id && {
        nationality_id: props.ids.nationality_id,
      }),
    },
  };

  try {
    const author: ResponseAuthorExtended = await prisma.author.create({
      ...payload,
      include: {
        nationality: true,
        profession: true,
      },
    });
    return {
      success: true,
      status: 201,
      data: normalizeForOne(author),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};
