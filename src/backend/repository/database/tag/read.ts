import prisma from '../../lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Tag,
  TagSimplified,
  Filter,
  Find,
} from '@backend/entity/tag/type';
import type { ResultOne, ResultMany, ResultOptions } from '../types';
import type { InputTagGetOne, InputTagGetMany, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;
type TagResultMany = ResultMany<Tag>;
type TagResultManyOptions = ResultOptions<TagSimplified>;

export const findMany = async (props: Filter): Promise<TagResultMany> => {
  const payload: InputTagGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(props.name && {
        OR: [
          { name_en: { contains: props.name, mode: 'insensitive' } },
          { name_id: { contains: props.name, mode: 'insensitive' } },
        ],
      }),
      ...(props.slug && {
        slug: { contains: props.slug, mode: 'insensitive' },
      }),
    },
  };

  try {
    const tags: ResponseTag[] = await prisma.tag.findMany(payload);

    const count = await prisma.tag.count({
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(tags), total: count },
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

export const finOne = async (props: Find): Promise<TagResultOne> => {
  const payload: InputTagGetOne = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const tag: ResponseTag | null = await prisma.tag.findFirst(payload);

    if (tag === null) {
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(tag),
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
): Promise<TagResultManyOptions> => {
  const payload: InputTagGetMany = {
    orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
    skip: props.page * props.limit,
    take: props.limit,
    where: {
      ...(props.name && {
        OR: [
          { name_en: { contains: props.name, mode: 'insensitive' } },
          { name_id: { contains: props.name, mode: 'insensitive' } },
        ],
      }),
    },
  };

  try {
    const tags = await prisma.tag.findMany(payload);
    return {
      success: true,
      status: 200,
      data: normalizeForOption(tags),
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
