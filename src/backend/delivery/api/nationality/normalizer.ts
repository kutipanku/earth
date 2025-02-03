import type { Nationality } from '@backend/entity/nationality/type';
import type { GetNationality, GetNationalities } from './contract';

type ResponseGetNationality = GetNationality['response']['data'];
type ResponseGetNationalities = GetNationalities['response']['data']['list'];

export const normalizeOne = (item: Nationality | null) => {
  if (item === null) return [];

  const normalizedItem: ResponseGetNationality = {
    id: item.id,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
    slug: item.slug,
    flag: item.flag,
    metadata: item.metadata && {
      created_at: item.metadata.created_at.toISOString(),
      updated_at:
        item.metadata.updated_at !== null
          ? item.metadata.updated_at.toISOString()
          : item.metadata.created_at.toISOString(),
    },
  };

  return normalizedItem;
};

export const normalizeForList = (items: Nationality[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetNationalities = items.map((item) => ({
    id: item.id,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
    flag: item.flag,
  }));

  return normalizedItem;
};
