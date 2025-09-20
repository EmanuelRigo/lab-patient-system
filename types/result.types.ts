export interface Result {
  _id: string;
  medicalStudyId: string;
  doctorAppointmentId: string;
  labtechnicianId?: string;
  biochemistId?: string;
  status: "pending" | "completed" | "failed";
  result?: string;
  description?: string;
  extractionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
