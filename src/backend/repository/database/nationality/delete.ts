import prisma from '@/backend/repository/lib/prisma';
import type { Nationality } from '@/backend/entity/nationality/type';
import type { NationalityForOne, DeleteOneProps } from './types';
import { normalizeForOne } from './normalizer';

interface Result {
  status: number;
  data: Nationality | null;
  error: string | null;
  errorFields?: string[];
}

export const deleteOne = async ({ id }: DeleteOneProps): Promise<Result> => {
  try {
    const deletedNationality: NationalityForOne =
      await prisma.nationality.delete({
        where: {
          id: id,
        },
      });
    return {
      status: 200,
      data: normalizeForOne(deletedNationality),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
