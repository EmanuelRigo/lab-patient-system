export interface DoctorsAppointment {
  _id?: string;
  doctorId: string;
  patientDNI: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
