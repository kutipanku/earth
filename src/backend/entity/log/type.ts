import type { Metadata } from '@/backend/entity/general/type';
import type { Admin } from '@/backend/entity/admin/type';

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
