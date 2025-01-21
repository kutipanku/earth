import type {
  Author,
  AuthorListItem,
  AuthorOptionItem,
  AuthorAtOtherEntity,
} from '@/backend/entity/author/type';
import { normalizeForOne as normalizeForOneNationality } from '@/backend/repository/database/nationality/normalizer';
import { normalizeForOne as normalizeForOneProfession } from '@/backend/repository/database/profession/normalizer';
import type {
  AuthorForOne,
  AuthorForMany,
  AuthorForManyOptions,
  AuthorForOtherEntity,
  AuthorForOtherEntityList,
} from './types';

export const normalizeForOne = (itemOnDB: AuthorForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Author = {
    id: itemOnDB.id,
    name: itemOnDB.name,
    slug: itemOnDB.slug,
    description: {
      ind: itemOnDB.description_id || '',
      eng: itemOnDB.description_en || '',
    },
    dob: itemOnDB.dob === null ? null : new Date(itemOnDB.dob),
    nationality: normalizeForOneNationality(itemOnDB.nationality),
    profession: normalizeForOneProfession(itemOnDB.profession),
    picture_url: itemOnDB.picture_url,
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeFoList = (itemsOnDB: AuthorForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: AuthorListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    nationality: item.nationality?.name_en || '',
    profession: item.profession?.name_en || '',
  }));

  return normalizedItem;
};

export const normalizeForOption = (
  itemsOnDB: AuthorForManyOptions[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: AuthorOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return normalizedItem;
};

export const normalizeForOtherEntity = (
  itemOnDB: AuthorForOtherEntity | null
) => {
  if (itemOnDB === null) return null;

  const normalizedItem: AuthorAtOtherEntity = {
    id: itemOnDB.id,
    name: itemOnDB.name,
  };

  return normalizedItem;
};

export const normalizeForOtherEntityList = (
  itemOnDB: AuthorForOtherEntityList | null
) => {
  if (itemOnDB === null) return null;

  const normalizedItem: AuthorAtOtherEntity = {
    id: itemOnDB.id,
    name: itemOnDB.name,
  };

  return normalizedItem;
};
