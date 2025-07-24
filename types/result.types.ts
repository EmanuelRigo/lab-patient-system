export interface Result {
  _id: string;
  status: "pending" | "completed" | "failed";
  IdBiochemist?: string;
  IdLabTechnician: string;
  extractionDate?: Date;
  extractionTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
