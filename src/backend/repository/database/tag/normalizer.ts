import type {
  Tag,
  TagListItem,
  TagOptionItem,
  TagAtOtherEntity,
} from '@/backend/entity/tag/type';
import type {
  TagForOne,
  TagForMany,
  TagForOtherEntity,
  TagForOtherEntityList,
} from './types';

export const normalizeForOne = (itemOnDB: TagForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Tag = {
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

export const normalizeFoList = (itemsOnDB: TagForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: TagListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      id: item.name_id || '',
      en: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizeForOption = (itemsOnDB: TagForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: TagOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      id: item.name_id || '',
      en: item.name_en || '',
    },
  }));

  return normalizedItem;
};

export const normalizeForOtherEntity = (
  itemsOnDB: TagForOtherEntity[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: TagAtOtherEntity[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      id: item.name_id || '',
      en: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizeForOtherEntityList = (
  itemsOnDB: TagForOtherEntityList[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: TagAtOtherEntity[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      id: item.name_id || '',
      en: item.name_en || '',
    },
  }));

  return normalizedItem;
};
