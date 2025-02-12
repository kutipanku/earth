import type { GenericItem } from '@frontend/entity/shared/types';
import type { Timestamp, MultilanguageContentOptional } from '../shared/types';

export interface AuthorResponseAPI {
  id: string;
  name: string;
  slug: string;
  description: MultilanguageContentOptional;
  dob: string | null;
  nationality: GenericItem | null;
  profession: GenericItem | null;
  picture_url: string | null;
  metadata: Timestamp;
}

export interface AuthorAddInputAPI {
  name: string;
  slug: string;
  dob?: string;
  picture_url?: string;
  description?: {
    eng?: string;
    ind?: string;
  };
  nationality_id?: string;
  profession_id?: string;
}

export interface AuthorEditInputAPI extends AuthorAddInputAPI {
  id: string;
}

export interface AuthorOptionItem {
  id: string;
  name: string;
}

export interface AuthorListItem {
  id: string;
  name: string;
  nationality: GenericItem | null;
  profession: GenericItem | null;
}

export interface AuthorListOutputAPI {
  success: boolean;
  data: {
    list: AuthorListItem[];
    total: number;
  };
}
