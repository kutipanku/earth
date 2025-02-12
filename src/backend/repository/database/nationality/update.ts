import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Nationality } from '@backend/entity/nationality/type';
import type { ResultOne } from '../types';
import type { InputNationalityUpdate, ResponseNationality } from './types';

type NationalityResultOne = ResultOne<Nationality>;

export const updateOne = async (
  props: Nationality
): Promise<NationalityResultOne> => {
  const payload: InputNationalityUpdate = {
    where: {
      id: props.id,
    },
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      ...(props.flag && { flag: props.flag }),
    },
  };

  try {
    const updatedNationality: ResponseNationality =
      await prisma.nationality.update(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOne(updatedNationality),
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
