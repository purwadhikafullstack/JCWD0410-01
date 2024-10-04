export interface Delivery_Order {
  id: number;
  deliveryNumber: string;
  status: DeliveryStatus;
  fee: number;
  latitude: string;
  longitude: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  userId: number;
  addressId: number;
  outletId: number;
  employeeId: number;
}

export enum DeliveryStatus {
  PROCESSING_LAUNDRY = "PROCESSING_LAUNDRY",
  WAITING_FOR_DRIVER = "WAITING_FOR_DRIVER",
  ON_THE_WAY_TO_OUTLET = "ON_THE_WAY_TO_OUTLET",
  ON_THE_WAY_TO_CUSTOMER = "ON_THE_WAY_TO_CUSTOMER",
  RECEIVED_BY_CUSTOMER = "RECEIVED_BY_CUSTOMER",
  ONSITE = "ONSITE",
}
