import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Profession } from '@beckend/entity/profession/type';
import type { ResultOne } from '../types';
import type { InputProfessionCreate, ResponseProfession } from './types';

type ProfessionResultOne = ResultOne<Profession>;

export const createOne = async (
  props: Profession
): Promise<ProfessionResultOne> => {
  const payload: InputProfessionCreate = {
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      ...(props.icon && { icon: props.icon }),
    },
  };

  try {
    const profession: ResponseProfession =
      await prisma.profession.create(payload);
    return {
      success: true,
      status: 201,
      data: normalizeForOne(profession),
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
