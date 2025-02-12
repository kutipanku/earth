import type { Metadata, MultilingualContent } from '../general/type';

export interface Category {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Metadata | null;
}

export interface CategorySimplified {
  id: string;
  name: MultilingualContent;
}

export interface Filter {
  page: number;
  limit: number;
  name: string | null;
  slug: string | null;
}

export interface Find {
  id?: string;
  slug?: string;
}
