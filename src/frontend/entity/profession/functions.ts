import type { Profession, ProfessionVariable } from './types';

export const convertToVariable = (
  profession: Profession
): ProfessionVariable => ({
  slug: profession.slug,
  nameEng: profession.name.eng,
  nameInd: profession.name.ind,
  id: profession.id,
  icon: profession.icon,
  createdAt: profession.metadata.createdAt,
  updatedAt: profession.metadata.updatedAt,
});

export const convertFromVariable = (
  variable: ProfessionVariable
): Profession => ({
  id: variable.id ?? '',
  slug: variable.slug,
  name: {
    eng: variable.nameEng,
    ind: variable.nameInd,
  },
  icon: variable.icon,
  metadata: {
    createdAt: variable.createdAt ?? '',
    updatedAt: variable.updatedAt ?? '',
  },
});
