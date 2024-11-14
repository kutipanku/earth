import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';

export interface Profession {
  id: string;
  slug: string;
  name: MultilingualContent;
  icon: string | null;
  metadata: Metadata;
}

export interface ProfessionListItem {
  id: string;
  slug: string;
  name: MultilingualContent;
}

export interface ProfessionOptionItem {
  id: string;
  name: MultilingualContent;
}
