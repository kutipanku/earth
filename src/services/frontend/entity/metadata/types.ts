export interface NodeActionTimestamps {
  createdAt: string | null;
  updatedAt: string | null;
}

export interface NodeVariables extends NodeActionTimestamps {
  id: string;
}
