import type { Nationality as NationalityOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Nationality
  extends Omit<NationalityOnDB, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export type NationalityDetailField = DynamicField<keyof Nationality>;
export interface NationalityVariables
  extends Omit<NationalityOnDB, 'id' | 'createdAt' | 'updatedAt'> {}

export type NationalityInputFIeld = DynamicField<keyof NationalityVariables>;
