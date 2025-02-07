import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Nationality } from '@backend/entity/nationality/type';
import type { ResultOne } from '../types';
import type { InputNationalityCreate, ResponseNationality } from './types';

type NationalityResultOne = ResultOne<Nationality>;

export const createOne = async (
  props: Nationality
): Promise<NationalityResultOne> => {
  const payload: InputNationalityCreate = {
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      ...(props.flag && { flag: props.flag }),
    },
  };

  try {
    const nationality: ResponseNationality =
      await prisma.nationality.create(payload);
    return {
      success: true,
      status: 201,
      data: normalizeForOne(nationality),
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
