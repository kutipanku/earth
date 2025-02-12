import type { Nationality, NationalityVariable } from './types';

export const convertToVariable = (
  nationality: Nationality
): NationalityVariable => ({
  slug: nationality.slug,
  nameEng: nationality.name.eng,
  nameInd: nationality.name.ind,
  id: nationality.id,
  flag: nationality.flag,
  createdAt: nationality.metadata.createdAt,
  updatedAt: nationality.metadata.updatedAt,
});

export const convertFromVariable = (
  variable: NationalityVariable
): Nationality => ({
  id: variable.id ?? '',
  slug: variable.slug,
  name: {
    eng: variable.nameEng,
    ind: variable.nameInd,
  },
  flag: variable.flag,
  metadata: {
    createdAt: variable.createdAt ?? '',
    updatedAt: variable.updatedAt ?? '',
  },
});
