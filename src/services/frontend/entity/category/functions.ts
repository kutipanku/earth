import type { Category, CategoryVariable } from './types';

export const convertToVariable = (category: Category): CategoryVariable => ({
  slug: category.slug,
  nameEng: category.name.eng,
  nameInd: category.name.ind,
  id: category.id,
  descriptionEng: category.description.eng,
  descriptionInd: category.description.ind,
  createdAt: category.metadata.createdAt,
  updatedAt: category.metadata.updatedAt,
});

export const convertFromVariable = (variable: CategoryVariable): Category => ({
  id: variable.id ?? '',
  slug: variable.slug,
  name: {
    eng: variable.nameEng,
    ind: variable.nameInd,
  },
  description: {
    eng: variable.descriptionEng ?? '',
    ind: variable.descriptionInd ?? '',
  },
  metadata: {
    createdAt: variable.createdAt ?? '',
    updatedAt: variable.updatedAt ?? '',
  },
});
