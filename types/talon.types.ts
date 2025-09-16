export interface Talon {
  _id: string;
  receptionistId?: string;
  paymentId?: string;
  isPaid?: boolean;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
