import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';
import type { AuthorAtOtherEntity } from '@/backend/entity/author/type';
import type { CategoryAtOtherEntity } from '@/backend/entity/category/type';
import type { TagAtOtherEntity } from '@/backend/entity/tag/type';

export interface Quote {
  id: string;
  slug: string;
  author: AuthorAtOtherEntity | null;
  description: MultilingualContent;
  content: MultilingualContent;
  url: MultilingualContent;
  category: CategoryAtOtherEntity | null;
  tags: TagAtOtherEntity[];
  metadata: Metadata;
}

export interface QuoteListItem {
  id: string;
  slug: string;
  content: MultilingualContent;
  author: AuthorAtOtherEntity | null;
  category: CategoryAtOtherEntity | null;
  tags: TagAtOtherEntity[];
}
