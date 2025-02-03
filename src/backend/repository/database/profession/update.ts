import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Profession } from '@backend/entity/profession/type';
import type { ResultOne } from '../types';
import type { InputProfessionUpdate, ResponseProfession } from './types';

type ProfessionResultOne = ResultOne<Profession>;

export const updateOne = async (
  props: InputProfessionUpdate
): Promise<ProfessionResultOne> => {
  try {
    const updatedProfession: ResponseProfession =
      await prisma.profession.update(props);

    return {
      status: 200,
      data: normalizeForOne(updatedProfession),
      error: null,
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};
