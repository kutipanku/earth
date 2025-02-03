import prisma from '../../lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type { Tag, TagSimplified } from '@backend/entity/tag/type';
import type { ResultOne, ResultMany, ResultOptions } from '../types';
import type { InputTagGetOne, InputTagGetMany, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;
type TagResultMany = ResultMany<Tag>;
type TagResultManyOptions = ResultOptions<TagSimplified>;

export const findMany = async (
  props: InputTagGetMany
): Promise<TagResultMany> => {
  try {
    const tags: ResponseTag[] = await prisma.tag.findMany(props);

    const count = await prisma.tag.count({
      where: props.where,
    });

    return {
      data: { list: normalizeFoList(tags), total: count },
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

export const finOne = async (props: InputTagGetOne): Promise<TagResultOne> => {
  const tag: ResponseTag | null = await prisma.tag.findFirst(props);

  if (tag === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizeForOne(tag), error: null, status: 200 };
};

export const findOptions = async (
  props: InputTagGetMany
): Promise<TagResultManyOptions> => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
      skip: 0,
      take: 100,
      ...props,
    });
    return { data: normalizeForOption(tags), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};
