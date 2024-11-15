import prisma from '@/backend/repository/lib/prisma';
import type { Quote } from '@/backend/entity/quote/type';
import type { QuoteForOne, DeleteOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: Quote | null;
  error: string | null;
  errorFields?: string[];
}

export const deleteOne = async ({ id }: DeleteOneProps): Promise<Result> => {
  try {
    const deletedQuote: QuoteForOne = await prisma.quote.delete({
      where: {
        id: id,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
    return { status: 200, data: normalizerForOne(deletedQuote), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};
