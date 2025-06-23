export interface Payment {
  amount: number;
  method: "credit_card" | "debit_card" | "cash" | "bank_transfer";
  status: "pending" | "completed" | "failed";
  IdPayment?: string;
  IdReceptionist: string;
  IdDoctorAppointment: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
