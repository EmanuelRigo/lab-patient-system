export interface MedicalStudy {
  name: string;
  price: number;
  description: string;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
