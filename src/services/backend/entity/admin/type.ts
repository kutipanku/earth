export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface Filter {
  page: number;
  limit: number;
  name: string | null;
}

export interface Find {
  email?: string;
}
