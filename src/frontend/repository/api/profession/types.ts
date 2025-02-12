export type {
  Profession,
  ProfessionDetail,
  ProfessionVariables,
} from '@frontend/entity/profession/types';
import type {
  Timestamp,
  MultilanguageContent,
  MultilanguageContentOptional,
} from '../shared/types';

export interface ProfessionResponseAPI {
  id: string;
  icon: string | null;
  name: MultilanguageContent;
  slug: string;
  metadata: Timestamp;
}

export interface ProfessionAddInputAPI {
  name?: MultilanguageContentOptional;
  icon?: string;
  slug?: string;
}

export interface ProfessionEditInputAPI extends ProfessionAddInputAPI {
  id: string;
}

export interface ProfessionOptionItem {
  id: string;
  name: MultilanguageContent;
}

export interface ProfessionListItem extends ProfessionOptionItem {
  slug: string;
  icon?: string;
}

export interface ProfessionListOutputAPI {
  data: {
    list: ProfessionListItem[];
    total: number;
  };
}
