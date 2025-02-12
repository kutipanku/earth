import type { NodeActionTimestamps } from '@/frontend/entity/metadata/types';
import type { DynamicField } from '@/frontend/entity/shared/types';
import type { Author } from '@/frontend/entity/author/types';
import type { Category } from '@/frontend/entity/category/types';
import type { Tag } from '@/frontend/entity/tag/types';

export interface Quote extends NodeActionTimestamps {
  id: string;
  slug: string;
  contentEn: string;
  contentId: string;
  imageUrlEn: string;
  imageUrlId: string;
  describtionEn: string;
  describtionId: string;
  author: Pick<Author, 'id' | 'name'> | null;
  category: Pick<Category, 'id' | 'nameEn'> | null;
  tags: Pick<Tag, 'id' | 'nameEn'>[] | null;
}

export type QuoteDetailField = DynamicField<keyof Quote, string>;
export interface QuoteVariables
  extends Omit<Quote, 'id' | 'createdAt' | 'updatedAt'> {
  tags: Pick<Tag, 'id' | 'nameEn'>[] | null;
}

export type QuoteInputFIeld = DynamicField<keyof QuoteVariables, string>;
