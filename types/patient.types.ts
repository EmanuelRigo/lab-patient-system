export interface Patient {
  _id: string;
  firstname: string;
  secondname?: string;
  lastname: string;
  birthDate: Date;
  dni: number;
  email?: string;
  phone?: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
