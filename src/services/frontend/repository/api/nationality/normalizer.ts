import type {
  Nationality,
  NationalityOption,
  NationalityVariable,
} from '@frontend/entity/nationality/types';
import type {
  AddNationality,
  GetNationality,
  GetNationalities,
  GetNationalityOptions,
} from './types';

type AddNationalityRequestBody = AddNationality['request']['body'];
type GetNationalityResponseData = GetNationality['response']['data'];
type GetNationalityOptionsResponseData =
  GetNationalityOptions['response']['data'];
type GetNationalitiesResponseDataList =
  GetNationalities['response']['data']['list'];

export const constructExternalBodyPayload = (internalData: Nationality) => {
  const externalData: AddNationalityRequestBody = {
    name: {
      eng: internalData.name.eng,
      ind: internalData.name.ind,
    },
    slug: internalData.slug,
    flag: internalData.flag,
  };

  return externalData;
};

export const constructOwnSystemData = (
  externalData: GetNationalityResponseData
) => {
  if (externalData === null) return null;

  const internalData: Nationality = {
    id: externalData.id,
    flag: externalData.flag,
    name: {
      eng: externalData.name.eng ?? '',
      ind: externalData.name.ind ?? '',
    },
    slug: externalData.slug,
    metadata: {
      createdAt: externalData.metadata?.created_at || '',
      updatedAt: externalData.metadata?.updated_at || '',
    },
  };

  return internalData;
};

export const constructOwnSystemFieldData = (
  externalData: GetNationalityResponseData
) => {
  if (externalData === null) return null;

  const internalData: NationalityVariable = {
    id: externalData.id,
    flag: externalData.flag,
    slug: externalData.slug,
    nameEng: externalData.name.eng ?? '',
    nameInd: externalData.name.ind ?? '',
    createdAt: externalData.metadata?.created_at || '',
    updatedAt: externalData.metadata?.updated_at || '',
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetNationalitiesResponseDataList
) => {
  const internalDataItems: Nationality[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        slug: '',
        name: {
          eng: externalData.name.eng ?? '',
          ind: externalData.name.ind ?? '',
        },
        flag: externalData.flag,
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
  externalDataItems: GetNationalityOptionsResponseData
) => {
  const internalDataItems: NationalityOption[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        name: externalData.name,
      };
    }
  );

  return internalDataItems;
};
