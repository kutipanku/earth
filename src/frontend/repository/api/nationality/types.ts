export type {
  Nationality,
  NationalityDetail,
  NationalityVariables,
} from '@frontend/entity/nationality/types';
import type {
  Timestamp,
  MultilanguageContent,
  MultilanguageContentOptional,
} from '../core/types';

export interface NationalityResponseAPI {
  id: string;
  flag: string | null;
  name: MultilanguageContent;
  slug: string;
  metadata: Timestamp;
}

export interface NationalityAddInputAPI {
  name?: MultilanguageContentOptional;
  flag?: string;
  slug?: string;
}

export interface NationalityEditInputAPI extends NationalityAddInputAPI {
  id: string;
}

export interface NationalityOptionItem {
  id: string;
  name: MultilanguageContent;
}

export interface NationalityListItem extends NationalityOptionItem {
  slug: string;
  flag?: string;
}

export interface NationalityListOutputAPI {
  data: {
    list: NationalityListItem[];
    total: number;
  };
}
