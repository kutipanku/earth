import type { Tag as TagOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Tag
  extends Omit<TagOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}

export type TagDetailField = DynamicField<keyof Tag>;
export interface TagVariables
  extends Omit<TagOnDB, 'id' | 'created_at' | 'updated_at'> {}

export type TagInputFIeld = DynamicField<keyof TagVariables>;
