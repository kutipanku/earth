import type { DynamicField, GenericItem, Timestamp } from '../shared/types';

/**
 * Universal currency for processing log inside the entire system
 * Should be used in all usecase possible
 */
export interface Log {
  id: string;
  action: string;
  entity: string;
  data: {
    id: string;
    old: string;
    new: string;
  };
  admin: GenericItem;
  metadata: Timestamp;
}

/**
 * Local currency for available input variables
 * Should be used in log detail fields
 */
export interface LogVariable {
  id: string;
  admin: string;
  action: string;
  entity: string;
  dataId: string;
  dataNew: string;
  dataOld: string;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Local currency for available filter parameters
 */
export interface LogFilter {
  page: number | null;
  rowPerPage: number | null;
  admin: string | null;
  action: string | null;
  entity: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type LogField = DynamicField<keyof LogVariable>;
