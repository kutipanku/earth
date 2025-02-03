import type { Tag } from '@backend/entity/tag/type';
import type { GetTag, GetTags } from './contract';

type ResponseGetTag = GetTag['response']['data'];
type ResponseGetTags = GetTags['response']['data']['list'];

export const normalizeOne = (item: Tag | null) => {
  if (item === null) return [];

  const normalizedItem: ResponseGetTag = {
    id: item.id,
    slug: item.slug,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
    description: {
      eng: item.description.eng,
      ind: item.description.ind,
    },
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

export const normalizeForList = (items: Tag[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetTags = items.map((item) => ({
    id: item.id,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
  }));

  return normalizedItem;
};
