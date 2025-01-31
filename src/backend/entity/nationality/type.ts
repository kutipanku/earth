import type { Metadata, MultilingualContent } from '../general/type';

export interface Nationality {
  id: string;
  slug: string;
  name: MultilingualContent;
  flag: string | null;
  metadata: Metadata;
}

export interface NationalityListItem {
  id: string;
  slug: string;
  name: MultilingualContent;
}

export interface NationalityOptionItem {
  id: string;
  name: MultilingualContent;
}
