export type LabStaffRole = "LabTechnician" | "Biochemist" | "Admin";

export interface LabStaff {
  firstName: string;
  secondName?: string;
  lastName: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
