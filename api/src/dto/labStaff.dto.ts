type Role = "labStaff" | "admin" | "user"; // Puedes extender esto si tienes más roles

interface LabStaffData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role?: Role;
  isOnline?: boolean;
}

class LabStaffDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isOnline: boolean;

  constructor(data: LabStaffData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || "labStaff";
    this.isOnline = data.isOnline ?? false; // Usa nullish coalescing para evitar que `false` sea sobreescrito
  }
}

export default LabStaffDTO;
