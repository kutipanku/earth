import prisma from '../../lib/prisma/prisma';
import { normalizeForOne, normalizeFoList } from './normalizer';

import type { Admin, Filter, Find } from '@backend/entity/admin/type';
import type {
  InputAdminGetOne,
  InputAdminGetMany,
  ResponseAdmin,
} from './types';
import type { ResultOne, ResultMany } from '../types';

type AdminResultOne = ResultOne<Admin>;
type AdminResultMany = ResultMany<Admin>;

export const findMany = async (props: Filter): Promise<AdminResultMany> => {
  const payload: InputAdminGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    where: {
      ...(props.name && {
        name: { contains: props.name, mode: 'insensitive' },
      }),
    },
  };

  try {
    const admins: ResponseAdmin[] = await prisma.admin.findMany(payload);

    const count = await prisma.admin.count({
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(admins), total: count },
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

export const finOne = async (props: Find): Promise<AdminResultOne> => {
  const payload: InputAdminGetOne = {
    where: {
      email: props.email ?? '',
    },
  };

  try {
    const admin: ResponseAdmin | null = await prisma.admin.findFirst(payload);

    if (admin === null) {
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(admin),
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
