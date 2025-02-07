import type {
  Profession,
  ProfessionSimplified,
} from '@backend/entity/profession/type';
import type {
  GetProfession,
  GetProfessions,
  GetProfessionOptions,
} from './contract';

type ResponseGetProfession = GetProfession['response']['data'];
type ResponseGetProfessions = GetProfessions['response']['data']['list'];
type ResponseGetProfessionOptions = GetProfessionOptions['response']['data'];

export const normalizeOne = (item: Profession | null) => {
  if (item === null) return null;

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

export const normalizeForOption = (items: ProfessionSimplified[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetProfessionOptions = items.map((item) => ({
    id: item.id,
    name: item.name.eng ?? '',
  }));

  return normalizedItem;
};
