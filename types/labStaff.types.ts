export type LabStaffRole =
  | "admin"
  | "receptionist"
  | "labTechnician"
  | "biochemist";

// types/labStaff.types.ts
export interface LabStaff {
  _id?: string; // <-- opcional
  firstname: string;
  secondname?: string;
  lastname: string;
  username: string;
  password: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
