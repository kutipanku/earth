import prisma from '../../lib/prisma/prisma';
import { normalizeForOne, normalizeFoList } from './normalizer';

import type { Log, Filter, Find } from '@backend/entity/log/type';
import type {
  InputLogGetOne,
  InputLogGetMany,
  ResponseLogExtended,
} from './types';
import type { ResultOne, ResultMany, ResultOptions } from '../types';

type LogResultOne = ResultOne<Log>;
type LogResultMany = ResultMany<Log>;

export const findMany = async (props: Filter): Promise<LogResultMany> => {
  const payload: InputLogGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    orderBy: {
      created_at: 'desc',
    },
    include: {
      admin: true,
    },
    where: {
      ...(props.admin && {
        admin: {
          name: { contains: props.admin, mode: 'insensitive' },
        },
      }),
      ...(props.action && {
        action: { contains: props.action, mode: 'insensitive' },
      }),
      ...(props.entity && {
        entity: { contains: props.entity, mode: 'insensitive' },
      }),
    },
  };

  try {
    const logs: ResponseLogExtended[] = await prisma.log.findMany({
      ...payload,
      include: {
        admin: true,
      },
    });

    const count = await prisma.log.count({
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(logs), total: count },
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

export const finOne = async (props: Find): Promise<LogResultOne> => {
  const payload: InputLogGetOne = {
    where: {
      id: props.id ?? '',
    },
  };

  try {
    const log: ResponseLogExtended | null = await prisma.log.findFirst({
      ...payload,
      include: {
        admin: true,
      },
    });

    if (log === null) {
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(log),
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
