import type {
  DynamicField,
  GenericItem,
  MultilingualContent,
  Timestamp,
} from '../shared/types';

/**
 * Universal currency for processing category inside the entire system
 * Should be used in all usecase possible
 */
export interface Category {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Timestamp;
}

/**
 * Universal currency for processing category as options
 * Should be used in select and autocomplete
 */
export type CategoryOption = GenericItem;

/**
 * Local currency for available input variables
 * Should be used in category detail, creation and modification fields
 */
export interface CategoryVariable {
  slug: string;
  nameEng: string;
  nameInd: string;
  id: string | null;
  descriptionEng: string | null;
  descriptionInd: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Local currency for available filter parameters
 */
export interface CategoryFilter {
  page: number | null;
  rowPerPage: number | null;
  name: string | null;
  slug: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type CategoryField = DynamicField<keyof CategoryVariable>;
