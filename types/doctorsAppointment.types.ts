export interface DoctorsAppointment {
  isPaid: boolean;
  paymentId?: string;
  patientId: string;
  medicalStudyId: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
