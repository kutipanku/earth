import type { Log as LogOnDB } from '@/entity/db/type';

export interface Log extends Omit<LogOnDB, 'created_at' | 'updated_at'> {
  created_at: string;
  updated_at: string;
}
export interface LogVariables
  extends Omit<
    LogOnDB,
    | 'user_id'
    | 'data'
    | 'data_old'
    | 'data_id'
    | 'user'
    | 'id'
    | 'created_at'
    | 'updated_at'
  > {}
