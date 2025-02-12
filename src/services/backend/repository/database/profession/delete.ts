import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Profession, Find } from '@beckend/entity/profession/type';
import type { ResultOne } from '../types';
import type { InputProfessionDelete, ResponseProfession } from './types';

type ProfessionResultOne = ResultOne<Profession>;

export const deleteOne = async (props: Find): Promise<ProfessionResultOne> => {
  const payload: InputProfessionDelete = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const deletedProfession: ResponseProfession =
      await prisma.profession.delete(payload);
    return {
      success: true,
      status: 200,
      data: normalizeForOne(deletedProfession),
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
