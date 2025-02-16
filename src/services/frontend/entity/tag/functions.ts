import type { Tag, TagVariable } from './types';

export const convertToVariable = (tag: Tag): TagVariable => ({
  slug: tag.slug,
  nameEng: tag.name.eng,
  nameInd: tag.name.ind,
  id: tag.id,
  descriptionEng: tag.description.eng,
  descriptionInd: tag.description.ind,
  createdAt: tag.metadata.createdAt,
  updatedAt: tag.metadata.updatedAt,
});

export const convertFromVariable = (variable: TagVariable): Tag => ({
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
