import type {
  Profession,
  ProfessionOption,
  ProfessionVariable,
} from '@frontend/entity/profession/types';
import type {
  AddProfession,
  GetProfession,
  GetProfessions,
  GetProfessionOptions,
} from './types';

type AddProfessionRequestBody = AddProfession['request']['body'];
type GetProfessionResponseData = GetProfession['response']['data'];
type GetProfessionOptionsResponseData =
  GetProfessionOptions['response']['data'];
type GetProfessionsResponseDataList =
  GetProfessions['response']['data']['list'];

export const constructExternalBodyPayload = (internalData: Profession) => {
  const externalData: AddProfessionRequestBody = {
    name: {
      eng: internalData.name.eng,
      ind: internalData.name.ind,
    },
    slug: internalData.slug,
    icon: internalData.icon,
  };

  return externalData;
};

export const constructOwnSystemData = (
  externalData: GetProfessionResponseData
) => {
  if (externalData === null) return null;

  const internalData: Profession = {
    id: externalData.id,
    icon: externalData.icon,
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
  externalData: GetProfessionResponseData
) => {
  if (externalData === null) return null;

  const internalData: ProfessionVariable = {
    id: externalData.id,
    icon: externalData.icon,
    slug: externalData.slug,
    nameEng: externalData.name.eng ?? '',
    nameInd: externalData.name.ind ?? '',
    createdAt: externalData.metadata?.created_at || '',
    updatedAt: externalData.metadata?.updated_at || '',
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetProfessionsResponseDataList
) => {
  const internalDataItems: Profession[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        slug: externalData.slug,
        name: {
          eng: externalData.name.eng ?? '',
          ind: externalData.name.ind ?? '',
        },
        icon: externalData.icon,
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
  externalDataItems: GetProfessionOptionsResponseData
) => {
  const internalDataItems: ProfessionOption[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        name: externalData.name,
      };
    }
  );

  return internalDataItems;
};
