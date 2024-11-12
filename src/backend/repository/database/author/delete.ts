import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/entity/author/type';
import type { AuthorForOne } from './types';
import { normalizerForOne } from './normalizer';

export interface DeleteOneProps {
  id: string;
}

interface Result {
  status: number;
  data: Author | null;
  error: string | null;
  errorFields?: string[];
}

export const deleteOne = async ({ id }: DeleteOneProps): Promise<Result> => {
  try {
    const deletedAuthor: AuthorForOne = await prisma.author.delete({
      where: {
        id: id,
      },
      include: {
        nationality: true,
        profession: true,
      },
    });
    return { status: 200, data: normalizerForOne(deletedAuthor), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
