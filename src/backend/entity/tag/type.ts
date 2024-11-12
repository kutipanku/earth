import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';

export interface Tag {
  id: string;
  slug: string;
  name: MultilingualContent;
  description: MultilingualContent;
  metadata: Metadata;
}
