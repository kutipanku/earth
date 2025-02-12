import type { Tag, TagSimplified } from '@backend/entity/tag/type';
import type { ResponseTag, ResponseTagSimplified } from './types';

export const normalizeForOne = (itemOnDB: ResponseTag | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Tag = {
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

export const normalizeFoList = (itemsOnDB: ResponseTag[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Tag[] = itemsOnDB.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
    description: {
      ind: item.description_id || '',
      eng: item.description_en || '',
    },
    metadata: {
      created_at: item.created_at,
      updated_at: item.updated_at,
    },
  }));

  return normalizedItem;
};

export const normalizeForOption = (
  itemsOnDB: ResponseTagSimplified[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: TagSimplified[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
  }));

  return normalizedItem;
};
