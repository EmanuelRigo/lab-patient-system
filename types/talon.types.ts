export interface Talon {
  _id: string;
  receptionistId?: string;
  paymentId?: string;
  isPaid?: boolean;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TalonView {
  _id: string;
  isPaid?: boolean;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  receptionistFirstName?: string;
  receptionistLastName?: string;
  patientFirstName: string;
  patientLastName: string;
  patientphoneNumber?: string;
}
