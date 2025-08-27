export interface MedicalStudy {
  _id: string;
  name: string;
  price: number;
  description: string;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
