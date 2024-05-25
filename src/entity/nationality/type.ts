import type { Nationality as NationalityOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Nationality
  extends Omit<NationalityOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}

export type NationalityDetailField = DynamicField<keyof Nationality>;
export interface NationalityVariables
  extends Omit<NationalityOnDB, 'id' | 'created_at' | 'updated_at'> {}

export type NationalityInputFIeld = DynamicField<keyof NationalityVariables>;
