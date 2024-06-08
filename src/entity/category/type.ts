import type { Category as CategoryOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Category
  extends Omit<CategoryOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}

export type CategoryDetailField = DynamicField<keyof Category>;
export interface CategoryVariables
  extends Omit<CategoryOnDB, 'id' | 'created_at' | 'updated_at'> {}

export type CategoryInputFIeld = DynamicField<keyof CategoryVariables>;
