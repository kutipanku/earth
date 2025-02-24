import type {
  Profession,
  ProfessionSimplified,
} from '@backend/entity/profession/type';
import type { ResponseProfession, ResponseProfessionSimplified } from './types';

export const normalizeForOne = (itemOnDB: ResponseProfession | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Profession = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_ind || '',
      eng: itemOnDB.name_eng || '',
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

export const normalizeFoList = (itemsOnDB: ResponseProfession[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Profession[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_ind || '',
      eng: item.name_eng || '',
    },
    icon: item.icon,
    slug: item.slug,
    metadata: {
      created_at: item.created_at,
      updated_at: item.updated_at,
    },
  }));

  return normalizedItem;
};

export const normalizeForOption = (
  itemsOnDB: ResponseProfessionSimplified[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: ProfessionSimplified[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_ind || '',
      eng: item.name_eng || '',
    },
  }));

  return normalizedItem;
};
