import type { Author, AuthorVariable } from './types';

export const convertToVariable = (author: Author): AuthorVariable => ({
  id: author.id,
  slug: author.slug,
  name: author.name,
  dob: author.dob,
  pictureUrl: author.pictureUrl,
  descriptionEng: author.description.eng,
  descriptionInd: author.description.ind,
  nationality: author.nationality?.id || null,
  profession: author.profession?.id || null,
  createdAt: author.metadata.createdAt,
  updatedAt: author.metadata.updatedAt,
});

export const convertFromVariable = (variable: AuthorVariable): Author => ({
  id: variable.id ?? '',
  slug: variable.slug,
  name: variable.name,
  description: {
    ind: variable.descriptionInd ?? '',
    eng: variable.descriptionEng ?? '',
  },
  dob: variable.dob,
  pictureUrl: variable.pictureUrl,
  metadata: {
    createdAt: variable.createdAt ?? '',
    updatedAt: variable.updatedAt ?? '',
  },
  nationality: null,
  ...(variable.nationality && {
    nationality: {
      id: variable.nationality,
      name: '',
    },
  }),
  profession: null,
  ...(variable.profession && {
    profession: {
      id: variable.profession,
      name: '',
    },
  }),
});
