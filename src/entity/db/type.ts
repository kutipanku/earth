export type {
  Nationality,
  Profession,
  Author,
  Tag,
  Quote,
  Product,
  Media,
  Log,
  SuperUser,
} from '@prisma/client';

export interface NodeActionTimestamps {
  created_at: string;
  updated_at: string;
}

export interface NodeVariables {
  id: string;
  created_at: string;
  updated_at: string;
}
