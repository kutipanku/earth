import type {
  Nationality,
  NationalitySimplified,
} from '@backend/entity/nationality/type';
import type {
  ResponseNationality,
  ResponseNationalitySimplified,
} from './types';

export const normalizeForOne = (itemOnDB: ResponseNationality | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Nationality = {
    id: itemOnDB.id,
    name: {
      ind: itemOnDB.name_ind,
      eng: itemOnDB.name_eng,
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

export const normalizeFoList = (itemsOnDB: ResponseNationality[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Nationality[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_ind,
      eng: item.name_eng,
    },
    slug: item.slug,
    flag: item.flag,
    metadata: {
      created_at: item.created_at,
      updated_at: item.updated_at,
    },
  }));

  return normalizedItem;
};

export const normalizeForOption = (
  itemsOnDB: ResponseNationalitySimplified[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: NationalitySimplified[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: {
      ind: item.name_ind,
      eng: item.name_eng,
    },
  }));

  return normalizedItem;
};
