import prisma from '../../lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Author,
  AuthorSimplified,
  Filter,
  Find,
} from '@backend/entity/author/type';
import type {
  InputAuthorGetOne,
  InputAuthorGetMany,
  ResponseAuthorExtended,
} from './types';
import type { ResultOne, ResultMany, ResultOptions } from '../types';

type AuthorResultOne = ResultOne<Author>;
type AuthorResultMany = ResultMany<Author>;
type AuthorResultManyOptions = ResultOptions<AuthorSimplified>;

export const findMany = async (props: Filter): Promise<AuthorResultMany> => {
  const payload: InputAuthorGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(props.name && {
        name: { contains: props.name, mode: 'insensitive' },
      }),
      ...(props.slug && {
        slug: { contains: props.slug, mode: 'insensitive' },
      }),
    },
  };

  try {
    const authors: ResponseAuthorExtended[] = await prisma.author.findMany({
      ...payload,
      include: {
        nationality: true,
        profession: true,
      },
    });

    const count = await prisma.author.count({
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(authors), total: count },
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
    };
  }
};

export const finOne = async (props: Find): Promise<AuthorResultOne> => {
  const payload: InputAuthorGetOne = {
    where: {
      id: props.id ?? '',
    },
  };

  try {
    const author: ResponseAuthorExtended | null = await prisma.author.findFirst(
      {
        ...payload,
        include: {
          nationality: true,
          profession: true,
        },
      }
    );

    if (author === null) {
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(author),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

export const findOptions = async (
  props: Filter
): Promise<AuthorResultManyOptions> => {
  const payload: InputAuthorGetMany = {
    orderBy: [{ name: 'asc' }],
    skip: props.page * props.limit,
    take: props.limit,
    where: {
      ...(props.name && {
        OR: [{ name: { contains: props.name, mode: 'insensitive' } }],
      }),
    },
  };

  try {
    const authors = await prisma.author.findMany(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOption(authors),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error: JSON.stringify(error),
    };
  }
};
