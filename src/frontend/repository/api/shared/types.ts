export interface MultilingualContent {
  eng: string | null;
  ind: string | null;
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
