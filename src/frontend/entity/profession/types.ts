import type {
  DynamicField,
  MultilanguageContent,
  Timestamp,
  GenericItem,
} from '../shared/types';

/**
 * Universal currency for processing profession inside the entire system
 * Should be used in all usecase possible
 */
export interface Profession {
  id: string;
  slug: string;
  name: MultilanguageContent;
  icon: string | null;
  metadata: Timestamp;
}

/**
 * Universal currency for processing profession as options
 * Should be used in select and autocomplete
 */
export type ProfessionOption = GenericItem;

/**
 * Local currency for available input variables
 * Should be used in profession detail, creation and modification fields
 */
export interface ProfessionVariable {
  slug: string;
  nameEng: string;
  nameInd: string;
  id: string | null;
  icon: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Local currency for available filter parameters
 */
export interface ProfessionFilter {
  page: number | null;
  rowPerPage: number | null;
  name: string | null;
  slug: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type ProfessionField = DynamicField<keyof ProfessionVariable>;
