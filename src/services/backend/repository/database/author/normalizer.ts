import { normalizeForOne as normalizeForOneNationality } from '../nationality/normalizer';
import { normalizeForOne as normalizeForOneProfession } from '../profession/normalizer';

import type { Author, AuthorSimplified } from '@backend/entity/author/type';
import type { ResponseAuthor, ResponseAuthorExtended } from './types';

export const normalizeForOne = (itemOnDB: ResponseAuthorExtended | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Author = {
    id: itemOnDB.id,
    name: itemOnDB.name,
    slug: itemOnDB.slug,
    description: {
      ind: itemOnDB.description_ind || '',
      eng: itemOnDB.description_eng || '',
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

export const normalizeFoList = (itemsOnDB: ResponseAuthorExtended[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Author[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: {
      eng: item.description_eng,
      ind: item.description_ind,
    },
    dob: item.dob,
    nationality: normalizeForOneNationality(item.nationality),
    profession: normalizeForOneProfession(item.profession),
    picture_url: item.picture_url,
    metadata: {
      created_at: item.created_at,
      updated_at: item.updated_at,
    },
  }));

  return normalizedItem;
};

export const normalizeForOption = (itemsOnDB: ResponseAuthor[] | null) => {
  if (itemsOnDB === null) return [];
  const date = new Date();

  const normalizedItem: AuthorSimplified[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return normalizedItem;
};

export const normalizeForOtherEntity = (itemOnDB: Author | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: AuthorSimplified = {
    id: itemOnDB.id,
    name: itemOnDB.name,
  };

  return normalizedItem;
};
