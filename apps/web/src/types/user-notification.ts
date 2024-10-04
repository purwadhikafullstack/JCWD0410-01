export interface User_Notification {
  id: number;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  notificationId: number;
}
