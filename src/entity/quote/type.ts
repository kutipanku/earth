import type { Quote as QuoteOnDB } from '@/entity/db/type';
import type { DynamicField } from '@/entity/ui/type';

export interface Quote
  extends Omit<QuoteOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
  tags: string[];
}

export type QuoteDetailField = DynamicField<keyof Quote>;
export interface QuoteVariables
  extends Omit<QuoteOnDB, 'id' | 'created_at' | 'updated_at'> {
    tags: string[];
  }

export type QuoteInputFIeld = DynamicField<keyof QuoteVariables>;
