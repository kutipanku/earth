import type { Author as AuthorOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Author extends Omit<AuthorOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}

export type AuthorDetailField = DynamicField<keyof Author>;
export interface AuthorVariables
  extends Omit<AuthorOnDB, 'id' | 'created_at' | 'updated_at'> {}

export type AuthorInputFIeld = DynamicField<keyof AuthorVariables>;
