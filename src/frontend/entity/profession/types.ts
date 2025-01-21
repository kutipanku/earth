import type { NodeActionTimestamps } from '@/frontend/entity/metadata/types';
import type { DynamicField } from '@/frontend/entity/core/types';

export interface Profession extends NodeActionTimestamps {
  id: string;
  icon: string | null;
  nameEn: string;
  nameId: string;
  slug: string;
}

export type ProfessionDetailField = DynamicField<keyof Profession, string>;

export interface ProfessionVariables
  extends Omit<Profession, 'id' | 'createdAt' | 'updatedAt'> {}

export type ProfessionInputFIeld = DynamicField<
  keyof ProfessionVariables,
  string
>;
