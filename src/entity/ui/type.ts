import type { StaticImageData } from 'next/image';

export interface Filter {
  label: string;
  key: string;
  value: string;
}

export interface TableRowProps<T> {
  row: T;
}

export interface DynamicField<T> {
  label: string;
  key: T;
  type: 'text' | 'autocomplete' | 'richtext' | 'date';
  style: {
    width: string;
    marginBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
  };
  prefix?: string | StaticImageData;
  required?: boolean;
  optionProps?: {
    entity: string;
    label: string;
  };
}

export interface SelectOption {
  id: string;
  name?: string;
  name_en?: string;
  name_id?: string;
}
