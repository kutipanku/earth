import type {
  Metadata,
  MultilingualContent,
} from '@/backend/entity/general/type';
import type { Nationality } from '@/backend/entity/nationality/type';
import type { Profession } from '@/backend/entity/profession/type';

export interface Author {
  id: string;
  name: string;
  slug: string;
  description: MultilingualContent;
  dob: Date | null;
  nationality: Nationality | null;
  profession: Profession | null;
  picture_url: string | null;
  metadata: Metadata;
}
