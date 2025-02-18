import type { Metadata } from '../general/type';
import type { Admin } from '../admin/type';

export interface Log {
  id: string;
  admin: Admin;
  data_id: string;
  action: string;
  entity: string;
  data: {
    old: string;
    new: string;
  };
  metadata: Metadata;
}

export interface Filter {
  page: number;
  limit: number;
  admin: string | null;
  action: string | null;
  entity: string | null;
}

export interface Find {
  id?: string;
}
