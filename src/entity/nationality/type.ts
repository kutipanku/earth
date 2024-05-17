import type { Nationality as NationalityOnDB } from '@/entity/db/type';
import type { Detail } from '@/entity/ui/type';

export interface Nationality
  extends Omit<NationalityOnDB, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export type NationalityDetailField = Detail<keyof Nationality>;
