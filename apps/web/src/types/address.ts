export interface Address {
  id: number;
  name: string;
  address: string;
  district: string;
  city: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
