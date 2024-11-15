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

export const normalizerForOne = (itemOnDB: CategoryForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Category = {
    id: itemOnDB.id,
    name: {
      id: itemOnDB.name_id || '',
      en: itemOnDB.name_en || '',
    },
    slug: itemOnDB.slug,
    description: {
      id: itemOnDB.description_id || '',
      en: itemOnDB.description_en || '',
    },
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizerFoList = (itemsOnDB: CategoryForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: CategoryListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      id: item.name_id || '',
      en: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizerForOption = (itemsOnDB: CategoryForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: CategoryOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      id: item.name_id || '',
      en: item.name_en || '',
    },
  }));

  return normalizedItem;
};

export const normalizerForOtherEntity = (
  itemOnDB: CategoryForOtherEntity | null
) => {
  if (itemOnDB === null) return null;

  const normalizedItem: CategoryAtOtherEntity = {
    id: itemOnDB.id,
    name: {
      id: itemOnDB.name_id || '',
      en: itemOnDB.name_en || '',
    },
  };

  return normalizedItem;
};

export const normalizerForOtherEntityList = (
  itemOnDB: CategoryForOtherEntityList | null
) => {
  if (itemOnDB === null) return null;

  const normalizedItem: CategoryAtOtherEntity = {
    id: itemOnDB.id,
    name: {
      id: itemOnDB.name_id || '',
      en: itemOnDB.name_en || '',
    },
  };

  return normalizedItem;
};
