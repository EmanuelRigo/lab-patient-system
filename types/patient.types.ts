export interface Patient {
  name: string;
  age: number;
  email?: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
