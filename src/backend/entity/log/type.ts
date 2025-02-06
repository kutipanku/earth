import type { Metadata } from '../general/type';
import type { Admin } from '../admin/type';

export interface Log {
  id: string;
  user: Admin;
  action: string;
  entity: string;
  data: {
    old: string;
    new: string;
  };
  metadata: Metadata;
}
