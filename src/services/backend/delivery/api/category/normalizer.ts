import type {
  Category,
  CategorySimplified,
} from '@backend/entity/category/type';
import type {
  GetCategory,
  GetCategories,
  GetCategoryOptions,
} from './contract';

type ResponseGetCategory = GetCategory['response']['data'];
type ResponseGetCategories = GetCategories['response']['data']['list'];
type ResponseGetCategoryOptions = GetCategoryOptions['response']['data'];

export const normalizeOne = (item: Category | null) => {
  if (item === null) return null;

  const normalizedItem: ResponseGetCategory = {
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

export const normalizeForList = (items: Category[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetCategories = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: {
      eng: item.name.eng,
      ind: item.name.ind,
    },
  }));

  return normalizedItem;
};

export const normalizeForOption = (items: CategorySimplified[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetCategoryOptions = items.map((item) => ({
    id: item.id,
    name: item.name.eng ?? '',
  }));

  return normalizedItem;
};
