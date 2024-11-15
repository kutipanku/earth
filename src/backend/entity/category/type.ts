import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';

export interface Category {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Metadata;
}

export interface CategoryListItem {
  id: string;
  slug: string;
  name: MultilingualContent;
}

export interface CategoryOptionItem {
  id: string;
  name: MultilingualContent;
}

export type CategoryAtOtherEntity = CategoryOptionItem;
