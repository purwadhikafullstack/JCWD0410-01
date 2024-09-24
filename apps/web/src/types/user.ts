export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: Role;
  provider: Provider;
  createdAt: string;
}

export enum Role {
  ADMIN = "ADMIN",
  OUTLET_ADMIN = "OUTLET_ADMIN",
  WORKER = "WORKER",
  DRIVER = "DRIVER",
  CUSTOMER = "CUSTOMER",
}

export enum Provider {
  CREDENTIALS = "CREDENTIALS",
  GOOGLE = "GOOGLE",
}
