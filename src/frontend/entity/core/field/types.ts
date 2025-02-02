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

export interface Filter {
  label: string;
  key: string;
  value: string;
}
