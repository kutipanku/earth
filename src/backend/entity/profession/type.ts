import type { Metadata, MultilingualContent } from '../general/type';

export interface Profession {
  id: string;
  slug: string;
  name: MultilingualContent;
  icon: string | null;
  metadata: Metadata | null;
}

export interface ProfessionSimplified {
  id: string;
  name: MultilingualContent;
}
