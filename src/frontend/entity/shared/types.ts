export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export interface MultilanguageContent {
  eng: string;
  ind: string;
}

export interface GenericItem {
  id: string;
  name: string;
}

// Reexport
export type { DynamicField, SelectOption, Filter } from './field/types';
export type { DrawerItem, DrawerIcon } from './ui/types';
export type { TableRowProps } from './table/types';
