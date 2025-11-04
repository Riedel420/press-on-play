// Simplified schema without database dependencies for now
export interface User {
  id: number;
  username: string;
  password: string;
}

export interface InsertUser {
  username: string;
  password: string;
}
