import type {
  Author,
  AuthorOption,
  AuthorVariable,
} from '@frontend/entity/author/types';
import type {
  AddAuthor,
  GetAuthor,
  GetAuthors,
  GetAuthorOptions,
} from './types';

type AddAuthorRequestBody = AddAuthor['request']['body'];
type GetAuthorResponseData = GetAuthor['response']['data'];
type GetAuthorOptionsResponseData = GetAuthorOptions['response']['data'];
type GetAuthorsResponseDataList = GetAuthors['response']['data']['list'];

export const constructExternalBodyPayload = (internalData: Author) => {
  const externalData: AddAuthorRequestBody = {
    name: internalData.name,
    slug: internalData.slug,
    description: {
      eng: internalData.description.eng,
      ind: internalData.description.ind,
    },
    nationality_id: internalData.nationality?.id,
    profession_id: internalData.profession?.id,
    ...(internalData.dob && { dob: internalData.dob }),
    ...(internalData.pictureUrl && { picture_url: internalData.pictureUrl }),
  };

  return externalData;
};

export const constructOwnSystemData = (externalData: GetAuthorResponseData) => {
  if (externalData === null) return null;

  const internalData: Author = {
    id: externalData.id ?? '',
    slug: externalData.slug,
    name: externalData.name,
    description: {
      ind: externalData.description.ind ?? '',
      eng: externalData.description.eng ?? '',
    },
    nationality: externalData.nationality,
    profession: externalData.profession,
    dob: externalData.dob,
    pictureUrl: externalData.picture_url,
    metadata: {
      createdAt: externalData.metadata?.created_at || '',
      updatedAt: externalData.metadata?.updated_at || '',
    },
  };

  return internalData;
};

export const constructOwnSystemFieldData = (
  externalData: GetAuthorResponseData
) => {
  if (externalData === null) return null;

  const internalData: AuthorVariable = {
    id: externalData.id,
    slug: externalData.slug,
    name: externalData.name,
    dob: externalData.dob,
    pictureUrl: externalData.picture_url,
    descriptionEng: externalData.description.eng,
    descriptionInd: externalData.description.ind,
    nationality: externalData.nationality?.id || null,
    profession: externalData.profession?.id || null,
    createdAt: externalData.metadata?.created_at || null,
    updatedAt: externalData.metadata?.updated_at || null,
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetAuthorsResponseDataList
) => {
  const internalDataItems: Author[] = externalDataItems.map((externalData) => {
    return {
      id: externalData.id,
      slug: '',
      name: externalData.name,
      description: {
        ind: '',
        eng: '',
      },
      dob: '',
      pictureUrl: '',
      metadata: {
        createdAt: '',
        updatedAt: '',
      },
      nationality: externalData.nationality,
      profession: externalData.profession,
    };
  });

  return internalDataItems;
};

export const constructOwnSystemOptionData = (
  externalDataItems: GetAuthorOptionsResponseData
) => {
  const internalDataItems: AuthorOption[] = externalDataItems.map(
    (externalData) => {
      return {
        id: externalData.id,
        name: externalData.name,
      };
    }
  );

  return internalDataItems;
};
