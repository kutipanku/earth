import type {
  Category,
  CategoryOption,
  CategoryVariable,
} from '@frontend/entity/category/types';
import type {
  AddCategory,
  GetCategory,
  GetCategories,
  GetCategoryOptions,
} from './types';

type AddCategoryRequestBody = AddCategory['request']['body'];
type GetCategoryResponseData = GetCategory['response']['data'];
type GetCategoryOptionsResponseData = GetCategoryOptions['response']['data'];
type GetCategoriesResponseDataList = GetCategories['response']['data']['list'];

export const constructExternalBodyPayload = (internalData: Category) => {
  const externalData: AddCategoryRequestBody = {
    name: {
      eng: internalData.name.eng,
      ind: internalData.name.ind,
    },
    slug: internalData.slug,
    description: {
      eng: internalData.description.eng,
      ind: internalData.description.ind,
    },
  };

  return externalData;
};

export const constructOwnSystemData = (
  externalData: GetCategoryResponseData
) => {
  if (externalData === null) return null;

  const internalData: Category = {
    id: externalData.id,
    name: {
      eng: externalData.name.eng ?? '',
      ind: externalData.name.ind ?? '',
    },
    slug: externalData.slug,
    description: {
      eng: externalData.description.eng ?? '',
      ind: externalData.description.ind ?? '',
    },
    metadata: {
      createdAt: externalData.metadata?.created_at || '',
      updatedAt: externalData.metadata?.updated_at || '',
    },
  };

  return internalData;
};

export const constructOwnSystemFieldData = (
  externalData: GetCategoryResponseData
) => {
  if (externalData === null) return null;

  const internalData: CategoryVariable = {
    id: externalData.id,
    slug: externalData.slug,
    nameEng: externalData.name.eng ?? '',
    nameInd: externalData.name.ind ?? '',
    descriptionEng: externalData.description.eng ?? '',
    descriptionInd: externalData.description.ind ?? '',
    createdAt: externalData.metadata?.created_at || '',
    updatedAt: externalData.metadata?.updated_at || '',
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetCategoriesResponseDataList
) => {
  const internalDataItems: Category[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        slug: externalData.slug,
        name: {
          eng: externalData.name.eng ?? '',
          ind: externalData.name.ind ?? '',
        },
        description: {
          eng: '',
          ind: '',
        },
        metadata: {
          createdAt: '',
          updatedAt: '',
        },
      };
    }
  );

  return internalDataItems;
};

export const constructOwnSystemOptionData = (
  externalDataItems: GetCategoryOptionsResponseData
) => {
  const internalDataItems: CategoryOption[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        name: externalData.name,
      };
    }
  );

  return internalDataItems;
};
