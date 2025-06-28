export interface Result {
  status: "pending" | "completed" | "failed";
  IdBiochemist: string;
  IdLabTechnician: string;
  extractionDate?: Date;
  extractionTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
