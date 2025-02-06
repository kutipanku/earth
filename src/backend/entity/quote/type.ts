import type { Metadata, MultilingualContent } from '../general/type';
import type { Author } from '../author/type';
import type { Category } from '../category/type';
import type { Tag } from '../tag/type';

export interface Quote {
  id: string;
  slug: string;
  content: MultilingualContent;
  description: MultilingualContent;
  url: MultilingualContent;
  author: Author | null;
  category: Category | null;
  tags: Tag[] | null;
  metadata: Metadata | null;
  ids?: {
    author_id?: string;
    category_id?: string;
    tags_id?: string[];
  };
}
