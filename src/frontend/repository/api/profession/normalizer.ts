import type {
  Profession,
  ProfessionDetail,
  ProfessionVariables,
  ProfessionAddInputAPI,
  ProfessionResponseAPI,
} from './types';

/**
 * Convert internal own data type into acceptable data type on external source
 */
const normalizeInput = (input: ProfessionVariables) => {
  const output: ProfessionAddInputAPI = {};
  if (input.icon) output.icon = input.icon;
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
const normalizeOutput = (input: ProfessionResponseAPI) => {
  const output: Profession = {
    id: input.id,
    icon: input.icon,
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
const normalizeOutputForField = (input: ProfessionResponseAPI) => {
  const output: ProfessionDetail = {
    id: input.id,
    icon: input.icon,
    slug: input.slug,
    nameEng: input.name.eng,
    nameInd: input.name.ind,
    createdAt: input.metadata.created_at,
    updatedAt: input.metadata.updated_at,
  };

  return output;
};

export { normalizeInput, normalizeOutput, normalizeOutputForField };
