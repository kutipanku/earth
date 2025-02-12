import type { Metadata, MultilingualContent } from '../general/type';

export interface Nationality {
  id: string;
  slug: string;
  name: MultilingualContent;
  flag: string | null;
  metadata: Metadata | null;
}

export interface NationalitySimplified {
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
