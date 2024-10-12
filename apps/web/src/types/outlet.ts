export interface Outlet {
  id: number;
  name: string;
  type: Type;
  address: string;
  latitude: string;
  longitude: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum Type {
  MAIN = "MAIN",
  BRANCH = "BRANCH",
}
