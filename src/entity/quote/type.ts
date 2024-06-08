import type { Quote as QuoteOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';
import type { Author } from '@/entity/author/type';
import type { Category } from '@/entity/category/type';
import type { Tag } from '@/entity/tag/type';

export interface Quote extends Omit<QuoteOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
  author?: Pick<Author, 'name'>;
  category?: Pick<Category, 'name_en'>;
  tags?: Pick<Tag, 'id' | 'name_en'>[];
}

export type QuoteDetailField = DynamicField<keyof Quote>;
export interface QuoteVariables
  extends Omit<QuoteOnDB, 'id' | 'created_at' | 'updated_at'> {
  tags: string[];
}

export type QuoteInputFIeld = DynamicField<keyof QuoteVariables>;
