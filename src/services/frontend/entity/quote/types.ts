import type {
  DynamicField,
  GenericItem,
  Timestamp,
  MultilingualContent,
} from '../shared/types';

/**
 * Universal currency for processing quote inside the entire system
 * Should be used in all usecase possible
 */
export interface Quote {
  id: string;
  slug: string;
  content: MultilingualContent;
  description: MultilingualContent;
  imageUrl: MultilingualContent;
  author: GenericItem | null;
  category: GenericItem | null;
  tags: GenericItem[] | null;
  metadata: Timestamp;
}

/**
 * Local currency for available input variables
 * Should be used in quote detail, creation and modification fields
 */
export interface QuoteVariable {
  slug: string;
  id: string | null;
  contentEng: string | null;
  contentInd: string | null;
  descriptionEng: string | null;
  descriptionInd: string | null;
  imageUrlEng: string | null;
  imageUrlInd: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Local currency for available filter parameters
 */
export interface QuoteFilter {
  page: number | null;
  rowPerPage: number | null;
  content: string | null;
  description: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type QuoteField = DynamicField<keyof QuoteVariable>;
