import type { NodeActionTimestamps } from '@frontend/entity/metadata/types';
import type { DynamicField } from '@frontend/entity/shared/types';

export interface Category extends NodeActionTimestamps {
  id: string;
  slug: string;
  nameEn: string;
  nameId: string;
  descriptionId: string | null;
  descriptionEn: string | null;
}

export type CategoryDetailField = DynamicField<keyof Category, string>;
export interface CategoryVariables
  extends Omit<Category, 'id' | 'createdAt' | 'updatedAt'> {}

export type CategoryInputFIeld = DynamicField<keyof CategoryVariables, string>;
