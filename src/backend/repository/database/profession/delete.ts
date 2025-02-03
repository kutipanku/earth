import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Profession } from '@/backend/entity/profession/type';
import type { ResultOne } from '../types';
import type { InputProfessionDelete, ResponseProfession } from './types';

type ProfessionResultOne = ResultOne<Profession>;

export const deleteOne = async (
  props: InputProfessionDelete
): Promise<ProfessionResultOne> => {
  try {
    const deletedProfession: ResponseProfession =
      await prisma.profession.delete(props);
    return {
      status: 200,
      data: normalizeForOne(deletedProfession),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
