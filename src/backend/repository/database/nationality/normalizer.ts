import type {
  Nationality,
  NationalityListItem,
  NationalityOptionItem,
} from '@/backend/entity/nationality/type';
import type { NationalityForOne, NationalityForMany } from './types';

export const normalizeForOne = (itemOnDB: NationalityForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Nationality = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_id || '',
      eng: itemOnDB.name_en || '',
    },
    slug: itemOnDB.slug,
    flag: itemOnDB.flag,
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: NationalityForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: NationalityListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizeForOption = (itemsOnDB: NationalityForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: NationalityOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
  }));

  return normalizedItem;
};
