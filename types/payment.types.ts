export interface Payment {
  amount: number;
  method: "credit_card" | "debit_card" | "cash" | "bank_transfer";
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
