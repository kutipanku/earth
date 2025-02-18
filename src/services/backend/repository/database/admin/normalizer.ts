import type { Admin } from '@backend/entity/admin/type';
import type { ResponseAdmin } from './types';

export const normalizeForOne = (itemOnDB: ResponseAdmin | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Admin = {
    id: itemOnDB.id,
    name: itemOnDB.name,
    email: '*************@*****.***',
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: ResponseAdmin[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Admin[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: item.name,
    email: '*************@*****.***',
  }));

  return normalizedItem;
};
