export type DrawerIcon =
  | 'flag'
  | 'work'
  | 'account'
  | 'category'
  | 'offer'
  | 'quote'
  | 'paid'
  | 'book'
  | 'multimedia'
  | 'log';

export interface DrawerItem {
  text: string;
  icon: DrawerIcon;
  path: string;
}

export interface Filter {
  label: string;
  key: string;
  value: string;
}

export interface TableRowProps<T> {
  row: T;
}

export interface DynamicField<T, U> {
  label: string;
  key: T;
  type: 'text' | 'autocomplete' | 'richtext' | 'date';
  style: {
    width: string;
    marginBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
  };
  prefix?: string | U;
  required?: boolean;
  optionProps?: {
    entity: string;
    label: string;
    isMultiple?: boolean;
  };
}

export interface SelectOption {
  id: string;
  name?: string;
  name_en?: string;
  name_id?: string;
}

export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export interface MultilanguageContent {
  eng: string;
  ind: string;
}
