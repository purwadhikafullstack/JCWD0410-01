export interface Notification {
  id: number;
  title: string;
  message: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}