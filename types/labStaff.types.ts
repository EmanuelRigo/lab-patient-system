export type LabStaffRole = "Technician" | "Scientist" | "Assistant";

export interface LabStaff {
  name: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
