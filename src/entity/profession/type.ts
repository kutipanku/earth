import type { Profession as ProfessionOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Profession
  extends Omit<ProfessionOnDB, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export type ProfessionDetailField = DynamicField<keyof Profession>;
export interface ProfessionVariables
  extends Omit<ProfessionOnDB, 'id' | 'createdAt' | 'updatedAt'> {}

export type ProfessionInputFIeld = DynamicField<keyof ProfessionVariables>;
