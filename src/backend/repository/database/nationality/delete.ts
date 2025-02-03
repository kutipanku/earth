import prisma from '@backend/repository/lib/prisma';
import type { Nationality } from '@/backend/entity/nationality/type';
import { normalizeForOne } from './normalizer';
import type { ResultOne } from '../types';
import type { InputNationalityDelete, ResponseNationality } from './types';

type NationalityResultOne = ResultOne<Nationality>;

export const deleteOne = async (
  props: InputNationalityDelete
): Promise<NationalityResultOne> => {
  try {
    const deletedNationality: ResponseNationality =
      await prisma.nationality.delete(props);
    return {
      status: 200,
      data: normalizeForOne(deletedNationality),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
