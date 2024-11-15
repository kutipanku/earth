import prisma from '@/backend/repository/lib/prisma';
import type { Profession } from '@/backend/entity/profession/type';
import type { ProfessionForOne, DeleteOneProps } from './types';
import { normalizeForOne } from './normalizer';

interface Result {
  status: number;
  data: Profession | null;
  error: string | null;
  errorFields?: string[];
}

export const deleteOne = async ({ id }: DeleteOneProps): Promise<Result> => {
  try {
    const deletedProfession: ProfessionForOne = await prisma.profession.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: normalizeForOne(deletedProfession),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
