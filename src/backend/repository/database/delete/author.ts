import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/repository/lib/prisma-types';

export interface DeleteOneProps {
  id: string;
}

export const deleteOne = async ({ id }: DeleteOneProps) => {
  try {
    const deletedAuthor: Author = await prisma.author.delete({
      where: {
        id: id,
      },
    });
    return { status: 200, data: deletedAuthor, error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
