import type {
  Nationality,
  NationalityDetail,
  NationalityVariables,
  NationalityAddInputAPI,
  NationalityResponseAPI,
} from './types';

/**
 * Convert internal own data type into acceptable data type on external source
 */
const normalizeInput = (input: NationalityVariables) => {
  const output: NationalityAddInputAPI = {};
  if (input.flag) output.flag = input.flag;
  if (input.slug) output.slug = input.slug;
  if (input.nameEng || input.nameInd) {
    output.name = {};
    if (input.nameEng) output.name.eng = input.nameEng;
    if (input.nameInd) output.name.ind = input.nameInd;
  }

  return output;
};

/**
 * Convert external data type into acceptable data type on internal own system
 */
const normalizeOutput = (input: NationalityResponseAPI) => {
  const output: Nationality = {
    id: input.id,
    flag: input.flag,
    name: {
      eng: input.name.eng,
      ind: input.name.ind,
    },
    slug: input.slug,
    metadata: {
      createdAt: input.metadata.created_at,
      updatedAt: input.metadata.updated_at,
    },
  };

  return output;
};

/**
 * Convert external data type into acceptable data type on internal own system
 */
const normalizeOutputForField = (input: NationalityResponseAPI) => {
  const output: NationalityDetail = {
    id: input.id,
    flag: input.flag,
    slug: input.slug,
    nameEng: input.name.eng,
    nameInd: input.name.ind,
    createdAt: input.metadata.created_at,
    updatedAt: input.metadata.updated_at,
  };

  return output;
};

export { normalizeInput, normalizeOutput, normalizeOutputForField };
