import type {
  Category,
  CategoryListItem,
  CategoryOptionItem,
  CategoryAtOtherEntity,
} from '@/backend/entity/category/type';
import type {
  CategoryForOne,
  CategoryForMany,
  CategoryForOtherEntity,
  CategoryForOtherEntityList,
} from './types';

export const normalizeForOne = (itemOnDB: CategoryForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Category = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_id || '',
      eng: itemOnDB.name_en || '',
    },
    slug: itemOnDB.slug,
    description: {
      ind: itemOnDB.description_id || '',
      eng: itemOnDB.description_en || '',
    },
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: CategoryForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: CategoryListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizeForOption = (itemsOnDB: CategoryForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: CategoryOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
  }));

  return normalizedItem;
};

export const normalizeForOtherEntity = (
  itemOnDB: CategoryForOtherEntity | null
) => {
  if (itemOnDB === null) return null;

  const normalizedItem: CategoryAtOtherEntity = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_id || '',
      eng: itemOnDB.name_en || '',
    },
  };

  return normalizedItem;
};

export const normalizeForOtherEntityList = (
  itemOnDB: CategoryForOtherEntityList | null
) => {
  if (itemOnDB === null) return null;

  const normalizedItem: CategoryAtOtherEntity = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_id || '',
      eng: itemOnDB.name_en || '',
    },
  };

  return normalizedItem;
};
