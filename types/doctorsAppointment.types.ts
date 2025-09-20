export interface DoctorAppointment {
  _id: string;
  isPaid: boolean;
  talonId?: string;
  patientId: string;
  medicalStudyId: string;
  date: Date;
  receptionistId?: string;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DoctorAppointmentWithStudy extends DoctorAppointment {
  medicalStudy: {
    price: number;
  };
}
