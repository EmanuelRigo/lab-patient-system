// ✅ types/labStaff.types.ts

export type LabStaffRole = "Technician" | "Scientist" | "Assistant";
export type ShiftType = "morning" | "afternoon" | "night";

export interface LabStaff {
  name: string;
  role: LabStaffRole;
  email: string;
  phone: string;
  department: string;
  shift: ShiftType;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

export interface LabStaffInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role?: LabStaffRole;
}
