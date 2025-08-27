export interface DoctorAppointment {
  _id: string; // Mongo-style ID, 24 hex chars
  isPaid: boolean; // default: false
  talonId?: string; // opcional
  resultId?: string; // opcional
  patientId: string;
  medicalStudyId: string;
  date: string; // formato ISO 8601
  receptionistId?: string; // opcional
  reason?: string; // puede ser null
  status:
    | "status_scheduled"
    | "status_completed"
    | "status_cancelled"
    | "status_pending"; // default: 'status_pending'
  createdAt?: string | Date; // generado por el sistema
  updatedAt?: string | Date; // generado por el sistema
}
