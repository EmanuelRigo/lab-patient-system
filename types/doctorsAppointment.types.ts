export interface DoctorAppointment {
  _id: string;
  isPaid: boolean;
  talonId?: string;
  resultId?: string;
  patientId: string;
  medicalStudyId: string;
  date: Date;
  receptionistId?: string;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
