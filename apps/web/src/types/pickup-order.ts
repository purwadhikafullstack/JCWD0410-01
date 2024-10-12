export interface Pickup_Order {
  id: number;
  pickupNumber: string;
  status: PickupStatus;
  fee: number;
  latitude: String;
  longitude: String;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: string;
  orderId: number;
  userId: number;
  addressId: number;
  outletId: number;
  employeeId: number;
}

export enum PickupStatus {
  WAITING_FOR_DRIVER = "WAITING_FOR_DRIVER",
  ON_THE_WAY_TO_CUSTOMER = "ON_THE_WAY_TO_CUSTOMER",
  ON_THE_WAY_TO_OUTLET = "ON_THE_WAY_TO_OUTLET",
  RECEIVED_BY_OUTLET = "RECEIVED_BY_OUTLET",
  ONSITE = "ONSITE",
}
