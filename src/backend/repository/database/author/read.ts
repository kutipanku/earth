import prisma from '@/backend/repository/lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type { Author, AuthorSimplified } from '@/backend/entity/author/type';
import type { ResultOne, ResultMany, ResultOptions } from '../types';
import type {
  InputAuthorGetOne,
  InputAuthorGetMany,
  ResponseAuthorExtended,
} from './types';

type AuthorResultOne = ResultOne<Author>;
type AuthorResultMany = ResultMany<Author>;
type AuthorResultManyOptions = ResultOptions<AuthorSimplified>;

export const findMany = async (
  props: InputAuthorGetMany
): Promise<AuthorResultMany> => {
  try {
    const authors: ResponseAuthorExtended[] = await prisma.author.findMany({
      ...props,
      include: {
        nationality: true,
        profession: true,
      },
    });

    const count = await prisma.author.count({
      where: props.where,
    });

    return {
      data: { list: normalizeFoList(authors), total: count },
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const finOne = async (
  props: InputAuthorGetOne
): Promise<AuthorResultOne> => {
  try {
    const author: ResponseAuthorExtended | null = await prisma.author.findFirst(
      {
        ...props,
        include: {
          nationality: true,
          profession: true,
        },
      }
    );

    if (author === null) {
      return { data: null, error: 'Not found', status: 404 };
    }
    return { data: normalizeForOne(author), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const findOptions = async (
  props: InputAuthorGetMany
): Promise<AuthorResultManyOptions> => {
  try {
    const authors = await prisma.author.findMany({
      orderBy: [{ name: 'asc' }],
      skip: 0,
      take: 100,
      ...props,
    });

    return { data: normalizeForOption(authors), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};
