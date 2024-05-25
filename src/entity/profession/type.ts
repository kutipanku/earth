import type { Profession as ProfessionOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Profession
  extends Omit<ProfessionOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}

export type ProfessionDetailField = DynamicField<keyof Profession>;
export interface ProfessionVariables
  extends Omit<ProfessionOnDB, 'id' | 'created_at' | 'updated_at'> {}

export type ProfessionInputFIeld = DynamicField<keyof ProfessionVariables>;
