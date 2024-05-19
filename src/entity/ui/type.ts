import type { StaticImageData } from 'next/image';

export interface Filter {
  label: string;
  key: string;
  value: string;
}

export interface DynamicField<T> {
  label: string;
  key: T;
  type: 'text' | 'textfield';
  style: {
    width: string;
    marginBottom: number;
    paddingLeft?: number;
    paddingRight?: number;
  };
  prefix?: string | StaticImageData;
  options?: {
    id: string;
    name: string;
  }[];
}
