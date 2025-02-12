export interface Metadata {
  created_at: Date;
  updated_at: Date | null;
}

export interface MultilingualContent {
  ind: string | null;
  eng: string | null;
}

export interface GenericItem {
  id: string;
  name: string;
}
