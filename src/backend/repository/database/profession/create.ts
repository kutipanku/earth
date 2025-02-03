import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Profession } from '@/backend/entity/profession/type';
import type { ResultOne } from '../types';
import type { InputProfessionCreate, ResponseProfession } from './types';

type ProfessionResultOne = ResultOne<Profession>;

export const createOne = async (
  props: InputProfessionCreate
): Promise<ProfessionResultOne> => {
  try {
    const profession: ResponseProfession =
      await prisma.profession.create(props);
    return { status: 201, data: normalizeForOne(profession), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
