import type { Metadata, MultilingualContent } from '../general/type';

export interface Tag {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Metadata | null;
}

export interface TagSimplified {
  id: string;
  name: MultilingualContent;
}
