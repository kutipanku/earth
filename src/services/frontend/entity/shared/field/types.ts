export interface DynamicField<T, U = string> {
  label: string;
  key: T;
  type: 'text' | 'autocomplete' | 'richtext' | 'date';
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
  name_eng?: string;
  name_ind?: string;
}

export interface Filter<InputVariable> {
  label: string;
  key: keyof InputVariable;
  value: string;
}
