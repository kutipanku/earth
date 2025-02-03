import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Nationality } from '@backend/entity/nationality/type';
import type { ResultOne } from '../types';
import type { InputNationalityUpdate, ResponseNationality } from './types';

type NationalityResultOne = ResultOne<Nationality>;

export const updateOne = async (
  props: InputNationalityUpdate
): Promise<NationalityResultOne> => {
  try {
    const updatedNationality: ResponseNationality =
      await prisma.nationality.update(props);

    return {
      status: 200,
      data: normalizeForOne(updatedNationality),
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
