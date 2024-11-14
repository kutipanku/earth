import type {
  Profession,
  ProfessionListItem,
  ProfessionOptionItem,
} from '@/backend/entity/profession/type';
import type { ProfessionForMany, ProfessionForOne } from './types';

export const normalizerForOne = (itemOnDB: ProfessionForMany | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Profession = {
    id: itemOnDB.id,
    name: {
      idn: itemOnDB.name_id || '',
      en: itemOnDB.name_en || '',
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

export const normalizerFoList = (itemsOnDB: ProfessionForOne[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: ProfessionListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      idn: item.name_id || '',
      en: item.name_en || '',
    },
    slug: item.slug,
  }));

  return normalizedItem;
};

export const normalizerForOption = (itemsOnDB: ProfessionForOne[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: ProfessionOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      idn: item.name_id || '',
      en: item.name_en || '',
    },
  }));

  return normalizedItem;
};
