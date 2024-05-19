export type {
  Nationality,
  Profession,
  Author,
  Tag,
  Quote,
  Product,
  Media,
  Log,
} from '@prisma/client';

export interface NodeActionTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface NodeVariables {
  id: string;
  createdAt: string;
  updatedAt: string;
}
