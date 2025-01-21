import type { Nationality } from '@/frontend/entity/nationality/types';
import type { Profession } from '@/frontend/entity/profession/types';
import type { NodeActionTimestamps } from '@/frontend/entity/metadata/types';
import type { DynamicField } from '@/frontend/entity/core/types';

export interface Author extends NodeActionTimestamps {
  id: string;
  name: string;
  dob: string | null;
  descriptionEn: string | null;
  descriptionId: string | null;
  pictureUrl: string | null;
  slug: string;
  nationalityId: string | null;
  professionId: string | null;
  nationality: Pick<Nationality, 'id' | 'nameEn'> | null;
  profession: Pick<Profession, 'id' | 'nameEn'> | null;
}

export type AuthorDetailField = DynamicField<keyof Author, string>;
export interface AuthorVariables
  extends Omit<
    Author,
    'id' | 'createdAt' | 'updatedAt' | 'author' | 'profession' | 'nationality'
  > {}

export type AuthorInputFIeld = DynamicField<keyof AuthorVariables, string>;
