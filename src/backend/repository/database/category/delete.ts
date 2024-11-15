import prisma from '@/backend/repository/lib/prisma';
import type { Category } from '@/backend/entity/category/type';
import type { CategoryForOne, DeleteOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: Category | null;
  error: string | null;
  errorFields?: string[];
}

export const deleteOne = async ({ id }: DeleteOneProps): Promise<Result> => {
  try {
    const deletedCategory: CategoryForOne = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: normalizerForOne(deletedCategory),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
