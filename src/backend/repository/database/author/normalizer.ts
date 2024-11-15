import type {
  Author,
  AuthorListItem,
  AuthorOptionItem,
} from '@/backend/entity/author/type';
import { normalizerForOne as normalizerForOneNationality } from '@/backend/repository/database/nationality/normalizer';
import { normalizerForOne as normalizerForOneProfession } from '@/backend/repository/database/profession/normalizer';
import type {
  AuthorForOne,
  AuthorForMany,
  AuthorForManyOptions,
} from './types';

export const normalizerForOne = (itemOnDB: AuthorForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Author = {
    id: itemOnDB.id,
    name: itemOnDB.name,
    slug: itemOnDB.slug,
    description: {
      idn: itemOnDB.description_id || '',
      en: itemOnDB.description_en || '',
    },
    dob: itemOnDB.dob === null ? null : new Date(itemOnDB.dob),
    // TODO: add nationality and profession,
    nationality: normalizerForOneNationality(itemOnDB.nationality),
    profession: normalizerForOneProfession(itemOnDB.profession),
    picture_url: itemOnDB.picture_url,
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizerFoList = (itemsOnDB: AuthorForMany[] | null) => {
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

export const normalizerForOption = (
  itemsOnDB: AuthorForManyOptions[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: AuthorOptionItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return normalizedItem;
};
