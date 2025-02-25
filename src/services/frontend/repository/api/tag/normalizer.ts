import type { Tag, TagOption, TagVariable } from '@frontend/entity/tag/types';
import type { AddTag, GetTag, GetTags, GetTagOptions } from './types';

type AddTagRequestBody = AddTag['request']['body'];
type GetTagResponseData = GetTag['response']['data'];
type GetTagOptionsResponseData = GetTagOptions['response']['data'];
type GetTagsResponseDataList = GetTags['response']['data']['list'];

export const constructExternalBodyPayload = (internalData: Tag) => {
  const externalData: AddTagRequestBody = {
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

export const constructOwnSystemData = (externalData: GetTagResponseData) => {
  if (externalData === null) return null;

  const internalData: Tag = {
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
  externalData: GetTagResponseData
) => {
  if (externalData === null) return null;

  const internalData: TagVariable = {
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
  externalDataItems: GetTagsResponseDataList
) => {
  const internalDataItems: Tag[] = externalDataItems.map((externalData) => {
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
  });

  return internalDataItems;
};

export const constructOwnSystemOptionData = (
  externalDataItems: GetTagOptionsResponseData
) => {
  const internalDataItems: TagOption[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        name: externalData.name,
      };
    }
  );

  return internalDataItems;
};
