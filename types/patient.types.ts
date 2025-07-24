export interface Patient {
  firstName: string;
  secondName?: string;
  lastName: string;
  birthDate: Date;
  dni: number;
  email?: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
