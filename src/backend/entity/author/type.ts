import type { Metadata, MultilingualContent } from '../general/type';
import type { Nationality } from '../nationality/type';
import type { Profession } from '../profession/type';

export interface Author {
  id: string;
  name: string;
  slug: string;
  description: MultilingualContent;
  dob: Date | null;
  nationality: Nationality | null;
  profession: Profession | null;
  picture_url: string | null;
  metadata: Metadata | null;
  ids?: {
    nationality_id?: string;
    profession_id?: string;
  };
}

export interface AuthorSimplified {
  id: string;
  name: string;
}
