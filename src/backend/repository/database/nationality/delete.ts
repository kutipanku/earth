import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Nationality, Find } from '@/backend/entity/nationality/type';
import type { ResultOne } from '../types';
import type { InputNationalityDelete, ResponseNationality } from './types';

type NationalityResultOne = ResultOne<Nationality>;

export const deleteOne = async (props: Find): Promise<NationalityResultOne> => {
  const payload: InputNationalityDelete = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const deletedNationality: ResponseNationality =
      await prisma.nationality.delete(payload);
    return {
      success: true,
      status: 200,
      data: normalizeForOne(deletedNationality),
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
