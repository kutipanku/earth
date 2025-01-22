import type {
  DynamicField,
  MultilanguageContent,
  Timestamp,
} from '../core/types';

export interface Profession {
  id: string;
  icon: string | null;
  name: MultilanguageContent;
  slug: string;
  metadata: Timestamp;
}

export interface ProfessionDetail extends Timestamp {
  id: string;
  slug: string;
  nameEng: string;
  nameInd: string;
  icon: string | null;
}

export type ProfessionDetailField = DynamicField<
  keyof ProfessionDetail,
  string
>;

export interface ProfessionVariables
  extends Omit<ProfessionDetail, 'id' | 'createdAt' | 'updatedAt'> {}

export type ProfessionInputField = DynamicField<
  keyof ProfessionVariables,
  string
>;
