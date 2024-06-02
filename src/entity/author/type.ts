import type { Author as AuthorOnDB } from '@/entity/db/type';
import type { Nationality } from '@/entity/nationality/type';
import type { Profession } from '@/entity/profession/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Author extends Omit<AuthorOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
  nationality?: Pick<Nationality, 'name_en'>;
  profession?: Pick<Profession, 'name_en'>;
}

export type AuthorDetailField = DynamicField<keyof Author>;
export interface AuthorVariables
  extends Omit<AuthorOnDB, 'id' | 'created_at' | 'updated_at'> {}

export type AuthorInputFIeld = DynamicField<keyof AuthorVariables>;
