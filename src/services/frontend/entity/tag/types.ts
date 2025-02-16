import type {
  DynamicField,
  MultilingualContent,
  Timestamp,
  GenericItem,
} from '../shared/types';

/**
 * Universal currency for processing tag inside the entire system
 * Should be used in all usecase possible
 */
export interface Tag {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Timestamp;
}

/**
 * Universal currency for processing tag as options
 * Should be used in select and autocomplete
 */
export type TagOption = GenericItem;

/**
 * Local currency for available input variables
 * Should be used in tag detail, creation and modification fields
 */
export interface TagVariable {
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
export interface TagFilter {
  page: number | null;
  rowPerPage: number | null;
  name: string | null;
  slug: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type TagField = DynamicField<keyof TagVariable>;
