import crypto from "crypto";

class TalonDTO {
  _id: string;
  receptionistId?: string;
  paymentId?: string;
  isPaid?: boolean;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Campos extras de la vista
  receptionistFirstName?: string;
  receptionistLastName?: string;
  patientFirstName?: string;
  patientLastName?: string;
  patientphoneNumber?: string; // 👈 usar el mismo nombre que el type

  constructor(data: any) {
    this._id =
      data._id ?? data.talon_id ?? crypto.randomBytes(12).toString("hex");

    // Tabla base
    this.receptionistId = data.receptionistId ?? data.receptionist_id;
    this.paymentId = data.paymentId ?? data.payment_id;
    this.isPaid = data.isPaid ?? data.is_paid;
    this.totalAmount = data.totalAmount ?? data.total_amount;
    this.createdAt =
      data.createdAt ?? data.talon_created_at ?? data.created_at ?? new Date();
    this.updatedAt =
      data.updatedAt ?? data.talon_updated_at ?? data.updated_at ?? new Date();

    // Vista
    this.receptionistFirstName =
      data.receptionistFirstName ?? data.receptionist_firstname;
    this.receptionistLastName =
      data.receptionistLastName ?? data.receptionist_lastname;
    this.patientFirstName = data.patientFirstName ?? data.patient_firstname;
    this.patientLastName = data.patientLastName ?? data.patient_lastname;
    this.patientphoneNumber = data.patientphoneNumber ?? data.patient_phone;
  }
}

export default TalonDTO;
