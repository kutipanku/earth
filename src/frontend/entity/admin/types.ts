import type { NodeActionTimestamps } from '@/frontend/entity/metadata/types';

interface SuperUserOnDB extends NodeActionTimestamps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  pictureUrl: string;
}

export type Admin = SuperUserOnDB;
