import type { Log } from '@backend/entity/log/type';
import type { ResponseLogExtended } from './types';

export const normalizeForOne = (itemOnDB: ResponseLogExtended | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Log = {
    id: itemOnDB.id,
    action: itemOnDB.action,
    entity: itemOnDB.entity,
    data_id: itemOnDB.data_id,
    data: {
      old: itemOnDB.data_old,
      new: itemOnDB.data,
    },
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at: null,
    },
    admin: itemOnDB.admin,
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: ResponseLogExtended[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Log[] = itemsOnDB.map((item) => ({
    id: item.id,
    action: item.action,
    entity: item.entity,
    data_id: item.data_id,
    data: {
      old: item.data_old,
      new: item.data,
    },
    metadata: {
      created_at: new Date(item.created_at),
      updated_at: null,
    },
    admin: item.admin,
  }));

  return normalizedItem;
};
