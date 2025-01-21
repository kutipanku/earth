export interface MultilanguageContent {
  eng: string;
  ind: string;
}

export interface MultilanguageContentOptional {
  eng?: string;
  ind?: string;
}

export interface Timestamp {
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  page: number;
  rowPerPage: number;
  filterString: string;
}

export interface ReponseAPI<Data> {
  data: Data;
  error: string | null;
  fields?: string[];
}
