export interface NodeActionTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface NodeVariables extends NodeActionTimestamps {
  id: string;
}
