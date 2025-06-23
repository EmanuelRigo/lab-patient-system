export interface DoctorsAppointment {
  doctorId: string;
  patientDNI: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
