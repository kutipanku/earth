import type { Admin } from '@/frontend/entity/admin/types';
import type { NodeActionTimestamps } from '@/frontend/entity/metadata/types';

interface Log extends NodeActionTimestamps {
  id: string;
  dataNew: string;
  dataOld: string;
  dataId: string;
  user: Admin | null;
}
export interface LogVariables
  extends Omit<
    Log,
    | 'userId'
    | 'data'
    | 'dataOld'
    | 'dataId'
    | 'user'
    | 'id'
    | 'createdAt'
    | 'updatedAt'
  > {}
