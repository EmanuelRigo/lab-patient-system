export interface Talon {
  _id: string;
  receptionistId?: string;
  paymentId?: string;
  isPaid?: boolean;
  total_amount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
