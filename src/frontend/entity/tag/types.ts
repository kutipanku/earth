import type { NodeActionTimestamps } from '@/frontend/entity/metadata/types';
import type { DynamicField } from '@/frontend/entity/shared/types';

export interface Tag extends NodeActionTimestamps {
  id: string;
  slug: string;
  nameEn: string;
  nameId: string;
  descriptionId: string | null;
  descriptionEn: string | null;
}

export type TagDetailField = DynamicField<keyof Tag, string>;
export interface TagVariables
  extends Omit<Tag, 'id' | 'createdAt' | 'updatedAt'> {}

export type TagInputFIeld = DynamicField<keyof TagVariables, string>;
