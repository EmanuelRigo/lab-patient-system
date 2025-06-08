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
