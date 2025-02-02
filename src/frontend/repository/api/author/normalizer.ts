import type {
  AuthorRow,
  AuthorDetail,
  AuthorInput,
} from '@frontend/entity/author/types';

import type {
  AuthorAddInputAPI,
  AuthorResponseAPI,
  AuthorListItem,
} from './types';

/**
 * Convert internal own data type into acceptable data type on external source
 */
export const normalizeInput = (input: AuthorDetail | AuthorInput) => {
  const output: AuthorAddInputAPI = {
    name: input.name,
    slug: input.slug,
  };

  if (input.dob) output.dob = input.dob;
  if (input.descriptionEng || input.descriptionInd) {
    output.description = {};
    if (input.descriptionInd) output.description.ind = input.descriptionInd;
    if (input.descriptionEng) output.description.eng = input.descriptionEng;
  }
  if (input.pictureUrl) output.picture_url = input.pictureUrl;
  if (input.nationality) output.nationality_id = input.nationality;
  if (input.profession) output.profession_id = input.profession;

  return output;
};

export const normalizeOutputRow = (input: AuthorListItem) => {
  const output: AuthorRow = {
    id: input.id,
    name: input.name,
    nationality: {
      id: input.nationality?.id || '',
      name: input.nationality?.name || '',
    },
    profession: {
      id: input.profession?.id || '',
      name: input.profession?.name || '',
    },
  };

  return output;
};

/**
 * Convert external data type into acceptable data type on internal own system
 */
export const normalizeOutputForField = (
  input: AuthorResponseAPI,
  type?: 'default' | 'edit'
) => {
  const key = type === 'edit' ? 'id' : 'name';
  const output: AuthorDetail = {
    id: input.id,
    name: input.name,
    slug: input.slug,
    dob: input.dob,
    descriptionEng: input.description.eng || '',
    descriptionInd: input.description.ind || '',
    pictureUrl: input.picture_url,
    nationality: input.nationality?.[key] || '',
    profession: input.profession?.[key] || '',
    createdAt: input.metadata.created_at,
    updatedAt: input.metadata.updated_at,
  };

  return output;
};
