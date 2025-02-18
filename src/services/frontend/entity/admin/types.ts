import type { DynamicField } from '../shared/types';

/**
 * Universal currency for processing admin inside the entire system
 * Should be used in all usecase possible
 */
export interface Admin {
  id: string;
  name: string;
  email: string;
}

/**
 * Local currency for available filter parameters
 */
export interface AdminFilter {
  page: number | null;
  rowPerPage: number | null;
  name: string | null;
  email: string | null;
}

/**
 * Local currency for available fields extending available input variables
 * Should be used as dynamic field parameters
 */
export type AdminField = DynamicField<keyof Admin>;
