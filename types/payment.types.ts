export interface Payment {
  _id: string;
  patientId: string;
  amount: number;
  talonId: string;
  receptionistId: string;
  method: "credit_card" | "debit_card" | "cash" | "bank_transfer";
  createdAt?: Date;
  updatedAt?: Date;
}
