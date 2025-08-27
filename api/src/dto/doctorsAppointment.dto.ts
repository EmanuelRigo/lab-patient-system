import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class DoctorsAppointmentDTO {
  isPaid: boolean = false;
  paymentId?: string;
  patientId: string;
  medicalStudyId: string;
  date: string;
  reason: string;
  status: "status_scheduled" | "status_completed" | "status_cancelled";
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: DoctorsAppointment) {
    this.isPaid = data.isPaid ?? false;
    this.paymentId = data.paymentId;
    this.patientId = data.patientId;
    this.medicalStudyId = data.medicalStudyId;
    this.date = data.date;
    this.reason = data.reason;
    this.status = data.status || "status_scheduled";
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default DoctorsAppointmentDTO;
