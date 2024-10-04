export interface WorkOrders {
  id: number;
  status: WorkStatus;
  byPassedAdmin: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  employeeId: number;
  stationId: number;
}

export enum WorkStatus {
  m = "m",
}