import type { DynamicField, GenericItem, Timestamp } from '../core/types';

/**
 * Used for Table
 */
export interface AuthorRow {
  id: string;
  name: string;
  nationality: GenericItem | null;
  profession: GenericItem | null;
}

/**
 * Used for Detail Page and Edit Page
 */
export interface AuthorDetail extends Timestamp {
  id: string;
  name: string;
  slug: string;
  dob: string | null;
  pictureUrl: string | null;
  descriptionEng: string | null;
  descriptionInd: string | null;
  nationality: string | null;
  profession: string | null;
}
export type AuthorDetailField = DynamicField<keyof AuthorDetail, string>;

/**
 * Used for Add Page
 */
export interface AuthorInput {
  name: string;
  slug: string;
  dob: string | null;
  pictureUrl: string | null;
  descriptionEng: string | null;
  descriptionInd: string | null;
  nationality: string | null;
  profession: string | null;
}
export type AuthorInputField = DynamicField<keyof AuthorInput, string>;
