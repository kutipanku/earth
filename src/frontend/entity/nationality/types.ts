import type {
  DynamicField,
  MultilanguageContent,
  Timestamp,
} from '../core/types';

export interface Nationality {
  id: string;
  flag: string | null;
  name: MultilanguageContent;
  slug: string;
  metadata: Timestamp;
}

export interface NationalityDetail extends Timestamp {
  id: string;
  slug: string;
  nameEng: string;
  nameInd: string;
  flag: string | null;
}

export type NationalityDetailField = DynamicField<
  keyof NationalityDetail,
  string
>;

export interface NationalityVariables
  extends Omit<NationalityDetail, 'id' | 'createdAt' | 'updatedAt'> {}

export type NationalityInputField = DynamicField<
  keyof NationalityVariables,
  string
>;
