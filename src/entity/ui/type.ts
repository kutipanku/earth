export interface Filter {
  label: string;
  key: string;
  value: string;
}

export interface Detail<T> {
  label: string;
  key: T;
  type: 'text';
  style: {
    width: string;
    marginBottom: number;
    paddingLeft?: number;
    paddingRight?: number;
  };
  prefix?: string;
  options?: {
    id: string;
    name: string;
  }[];
}
