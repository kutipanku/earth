import type { Author, AuthorSimplified } from '@backend/entity/author/type';
import type { GetAuthor, GetAuthors, GetAuthorOptions } from './contract';

type ResponseGetAuthor = GetAuthor['response']['data'];
type ResponseGetAuthorsList = GetAuthors['response']['data']['list'];
type ResponseGetAuthorOptions = GetAuthorOptions['response']['data'];

export const normalizeOne = (item: Author | null) => {
  if (item === null) return null;

  const normalizedItem: ResponseGetAuthor = {
    id: item.id,
    name: item.name,
    slug: item.slug,
    picture_url: item.picture_url,
    description: {
      ind: item.description.ind,
      eng: item.description.eng,
    },
    dob: item.dob !== null ? item.dob.toISOString() : null,
    metadata: item.metadata && {
      created_at: item.metadata.created_at.toISOString(),
      updated_at:
        item.metadata.updated_at !== null
          ? item.metadata.updated_at.toISOString()
          : item.metadata.created_at.toISOString(),
    },
    ...(item.nationality !== null
      ? {
          nationality: {
            id: item.nationality.id,
            name: item.nationality.name.eng ?? '',
          },
        }
      : { nationality: null }),
    ...(item.profession !== null
      ? {
          profession: {
            id: item.profession.id,
            name: item.profession.name.eng ?? '',
          },
        }
      : { profession: null }),
  };

  return normalizedItem;
};

export const normalizeForList = (items: Author[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetAuthorsList = items.map((item) => ({
    id: item.id,
    name: item.name,
    nationality: null,
    profession: null,
    ...(item.nationality && {
      nationality: {
        id: item.nationality.id,
        name: item.nationality.name.eng ?? '',
      },
    }),
    ...(item.profession && {
      profession: {
        id: item.profession.id,
        name: item.profession.name.eng ?? '',
      },
    }),
  }));

  return normalizedItem;
};

export const normalizeForOption = (items: AuthorSimplified[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetAuthorOptions = items.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return normalizedItem;
};
