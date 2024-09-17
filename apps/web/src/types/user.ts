export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePic?: string;
  role: Role;
  provider: Provider;
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
