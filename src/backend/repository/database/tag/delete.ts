import prisma from '@/backend/repository/lib/prisma';
import type { Tag } from '@/backend/entity/tag/type';
import type { TagForOne, DeleteOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: Tag | null;
  error: string | null;
  errorFields?: string[];
}

export const deleteOne = async ({ id }: DeleteOneProps): Promise<Result> => {
  try {
    const deletedTag: TagForOne = await prisma.tag.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
      data: normalizerForOne(deletedTag),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
