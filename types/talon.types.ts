export interface Talon {
  IdPatient: string;
  IdLabTechnician: string;
  IdBiochemist: string;
  statusPayment: "pending" | "completed" | "failed";
  IdPayment?: string;
  IdReceptionist: string;
  IdDoctorAppointment: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
