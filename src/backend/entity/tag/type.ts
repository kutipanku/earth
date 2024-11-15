import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';

export interface Tag {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Metadata;
}

export interface TagListItem {
  id: string;
  slug: string;
  name: MultilingualContent;
}

export interface TagOptionItem {
  id: string;
  name: MultilingualContent;
}

export type TagAtOtherEntity = TagOptionItem;
