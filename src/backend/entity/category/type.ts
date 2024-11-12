import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';

export interface Category {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Metadata;
}
