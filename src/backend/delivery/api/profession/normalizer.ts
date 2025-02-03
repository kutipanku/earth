import type { Profession } from '@backend/entity/profession/type';
import type { GetProfession, GetProfessions } from './contract';

type ResponseGetProfession = GetProfession['response']['data'];
type ResponseGetProfessions = GetProfessions['response']['data']['list'];

export const normalizeOne = (item: Profession | null) => {
  if (item === null) return [];

  const normalizedItem: ResponseGetProfession = {
    id: item.id,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
    slug: item.slug,
    icon: item.icon,
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

export const normalizeForList = (items: Profession[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetProfessions = items.map((item) => ({
    id: item.id,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
    icon: item.icon,
  }));

  return normalizedItem;
};
