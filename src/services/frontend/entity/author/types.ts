import type {
  DynamicField,
  GenericItem,
  Timestamp,
  MultilingualContent,
} from '../shared/types';

/**
 * Universal currency for processing author inside the entire system
 * Should be used in all usecase possible
 */
export interface Author {
  id: string;
  slug: string;
  name: string;
  description: MultilingualContent;
  nationality: GenericItem | null;
  profession: GenericItem | null;
  dob: string | null;
  pictureUrl: string | null;
  metadata: Timestamp;
}

/**
 * Universal currency for processing author as options
 * Should be used in select and autocomplete
 */
export type AuthorOption = GenericItem;

/**
 * Local currency for available input variables
 * Should be used in author detail, creation and modification fields
 */
export interface AuthorVariable {
  slug: string;
  name: string;
  id: string | null;
  dob: string | null;
  pictureUrl: string | null;
  descriptionEng: string | null;
  descriptionInd: string | null;
  nationality: string | null;
  profession: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Local currency for available filter parameters
 */
export interface AuthorFilter {
  page: number | null;
  rowPerPage: number | null;
  name: string | null;
  slug: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type AuthorField = DynamicField<keyof AuthorVariable>;
