export interface Patient {
  firstname: string;
  secondName?: string;
  lastname: string;
  birthDate: Date;
  dni: number;
  email?: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
