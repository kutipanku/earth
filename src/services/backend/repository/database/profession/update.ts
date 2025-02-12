import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Profession } from '@backend/entity/profession/type';
import type { ResultOne } from '../types';
import type { InputProfessionUpdate, ResponseProfession } from './types';

type ProfessionResultOne = ResultOne<Profession>;

export const updateOne = async (
  props: Profession
): Promise<ProfessionResultOne> => {
  const payload: InputProfessionUpdate = {
    where: {
      id: props.id,
    },
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      ...(props.icon && { icon: props.icon }),
    },
  };

  try {
    const updatedProfession: ResponseProfession =
      await prisma.profession.update(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOne(updatedProfession),
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
