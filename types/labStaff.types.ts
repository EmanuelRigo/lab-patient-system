export type LabStaffRole =
  | "LabTechnician"
  | "Biochemist"
  | "Assistant"
  | "Admin";

export interface LabStaff {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
