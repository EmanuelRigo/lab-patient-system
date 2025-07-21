export interface DoctorsAppointment {
  patientId: string;
  medicalStudyId: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  isPaid: boolean;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
