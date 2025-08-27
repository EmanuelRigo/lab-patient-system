export interface Result {
  _id: string;
  status: "pending" | "status_completed" | "failed";
  IdBiochemist?: string;
  IdLabTechnician: string;
  extractionDate?: Date;
  extractionTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
