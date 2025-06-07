export type Role = "labStaff" | "admin" | "user";

export interface LabStaff {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role?: Role;
  isOnline?: boolean;
}
