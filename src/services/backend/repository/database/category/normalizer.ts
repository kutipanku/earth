import type {
  Category,
  CategorySimplified,
} from '@backend/entity/category/type';

import type { ResponseCategory, ResponseCategorySimplified } from './types';

export const normalizeForOne = (itemOnDB: ResponseCategory | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Category = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_ind || '',
      eng: itemOnDB.name_eng || '',
    },
    slug: itemOnDB.slug,
    description: {
      ind: itemOnDB.description_ind || '',
      eng: itemOnDB.description_eng || '',
    },
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: ResponseCategory[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Category[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_ind || '',
      eng: item.name_eng || '',
    },
    description: {
      ind: item.description_ind || '',
      eng: item.description_eng || '',
    },
    slug: item.slug,
    metadata: {
      created_at: item.created_at,
      updated_at: item.updated_at,
    },
  }));

  return normalizedItem;
};

export const normalizeForOption = (
  itemsOnDB: ResponseCategorySimplified[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: CategorySimplified[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_ind || '',
      eng: item.name_eng || '',
    },
  }));

  return normalizedItem;
};
