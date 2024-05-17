import type { Profession as ProfessionOnDB } from '@/entity/db/type';
import type { Detail } from '@/entity/ui/type';

export interface Profession
  extends Omit<ProfessionOnDB, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export type ProfessionDetailField = Detail<keyof Profession>;
