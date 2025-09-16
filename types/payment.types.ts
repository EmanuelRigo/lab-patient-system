export interface Payment {
  _id: string;
  amount?: number;
  talonId: string;
  paymentMethodId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
