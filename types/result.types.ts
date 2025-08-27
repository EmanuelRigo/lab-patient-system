export interface Result {
  _id: string;
  status: "pending" | "completed" | "failed";
  labtechnicianId: string;
  biochemistId?: string;
  description?: string;
  extractionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
