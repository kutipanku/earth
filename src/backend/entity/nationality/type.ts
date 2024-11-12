import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';

export interface Nationality {
  id: string;
  slug: string;
  name: MultilingualContent;
  flag: string | null;
  metadata: Metadata;
}
