import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';
import type { Author } from '@/backend/entity/author/type';
import type { Category } from '@/backend/entity/category/type';
import type { Tag } from '@/backend/entity/tag/type';

export interface Quote {
  id: string;
  slug: string;
  author: Author;
  description: MultilingualContent;
  content: MultilingualContent;
  url: MultilingualContent;
  category: Category;
  tags: Tag[];
  metadata: Metadata;
}
