import type { Admin } from '@backend/entity/admin/type';
import type { GetAdmin, GetAdmins } from './contract';

type ResponseGetAdmin = GetAdmin['response']['data'];
type ResponseGetAdminsList = GetAdmins['response']['data']['list'];

export const normalizeOne = (item: Admin | null) => {
  if (item === null) return null;

  const normalizedItem: ResponseGetAdmin = {
    id: item.id,
    name: item.name,
    email: item.email,
  };

  return normalizedItem;
};

export const normalizeForList = (items: Admin[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetAdminsList = items.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
  }));

  return normalizedItem;
};
