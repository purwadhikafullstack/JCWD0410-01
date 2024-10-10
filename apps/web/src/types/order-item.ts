export interface OrderItem {
  id: number;
  name: string;
  itemQuantity: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  laundryItemId: number;
}
