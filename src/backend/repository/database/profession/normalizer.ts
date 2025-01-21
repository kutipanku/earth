import type {
  Profession,
  ProfessionListItem,
  ProfessionOptionItem,
} from '@/backend/entity/profession/type';
import type { ProfessionForMany, ProfessionForOne } from './types';

export const normalizeForOne = (itemOnDB: ProfessionForMany | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Profession = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_id || '',
      eng: itemOnDB.name_en || '',
    },
    slug: itemOnDB.slug,
    icon: itemOnDB.icon,
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: ProfessionForOne[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: ProfessionListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizeForOption = (itemsOnDB: ProfessionForOne[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: ProfessionOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_id || '',
      eng: item.name_en || '',
    },
  }));

  return normalizedItem;
};
