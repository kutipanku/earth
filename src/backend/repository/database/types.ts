export interface ResultMany<CustomType> {
  status: number;
  success: boolean;
  data: {
    list: CustomType[];
    total: number;
  };
  error: string | null;
  errorFields?: string[];
}

export interface ResultOne<CustomType> {
  status: number;
  success: boolean;
  data: CustomType | null;
  error: string | null;
  errorFields?: string[];
}

export interface ResultOptions<CustomType> {
  status: number;
  success: boolean;
  data: CustomType[] | null;
  error: string | null;
  errorFields?: string[];
}
