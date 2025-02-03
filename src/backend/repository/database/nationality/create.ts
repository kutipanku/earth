import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Nationality } from '@backend/entity/nationality/type';
import type { ResultOne } from '../types';
import type { InputNationalityCreate, ResponseNationality } from './types';

type NationalityResultOne = ResultOne<Nationality>;

export const createOne = async (
  props: InputNationalityCreate
): Promise<NationalityResultOne> => {
  try {
    const nationality: ResponseNationality =
      await prisma.nationality.create(props);
    return { status: 201, data: normalizeForOne(nationality), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
