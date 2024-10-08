export interface WorkOrders {
  id: number;
  status: WorkStatus;
  byPassed: boolean;
  byPassedAdmin?: number;
  byPassedNote?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  employeeId: number;
  stationId: number;
  outletId: number;
}

export enum WorkStatus {
  READY_FOR_WASHING = "READY_FOR_WASHING",
  BEING_WASHED = "BEING_WASHED",
  WASHING_COMPLETED = "WASHING_COMPLETED",
  READY_FOR_IRONING = "READY_FOR_IRONING",
  BEING_IRONED = "BEING_IRONED",
  IRONING_COMPLETED = "IRONING_COMPLETED",
  READY_FOR_PACKING = "READY_FOR_PACKING",
  BEING_PACKED = "BEING_PACKED",
  PACKING_COMPLETED = "PACKING_COMPLETED",
  BYPASSED = "BYPASSED",
}
