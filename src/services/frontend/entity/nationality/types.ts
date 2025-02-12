import type {
  DynamicField,
  MultilanguageContent,
  Timestamp,
  GenericItem,
} from '../shared/types';

/**
 * Universal currency for processing nationality inside the entire system
 * Should be used in all usecase possible
 */
export interface Nationality {
  id: string;
  slug: string;
  name: MultilanguageContent;
  flag: string | null;
  metadata: Timestamp;
}

/**
 * Universal currency for processing nationality as options
 * Should be used in select and autocomplete
 */
export type NationalityOption = GenericItem;

/**
 * Local currency for available input variables
 * Should be used in nationality detail, creation and modification fields
 */
export interface NationalityVariable {
  slug: string;
  nameEng: string;
  nameInd: string;
  id: string | null;
  flag: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Local currency for available filter parameters
 */
export interface NationalityFilter {
  page: number | null;
  rowPerPage: number | null;
  name: string | null;
  slug: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type NationalityField = DynamicField<keyof NationalityVariable>;
