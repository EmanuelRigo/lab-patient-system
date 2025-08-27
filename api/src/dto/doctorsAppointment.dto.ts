import { DoctorAppointment } from "../../../types/doctorsAppointment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class DoctorsAppointmentDTO {
  _id: string;
  isPaid: boolean = false;
  talonId?: string;
  resultId?: string;
  patientId: string;
  medicalStudyId: string;
  date: string;
  receptionistId?: string;
  reason?: string;
  status: "status_scheduled" | "status_completed" | "status_cancelled";
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: DoctorAppointment) {
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.isPaid = data.isPaid ?? false;
    this.talonId = data.talonId;
    this.resultId = data.resultId;
    this.patientId = data.patientId;
    this.medicalStudyId = data.medicalStudyId;
    this.date = data.date;
    this.receptionistId = data.receptionistId;
    this.reason = data.reason;
    this.status = data.status ?? "status_scheduled";
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default DoctorsAppointmentDTO;
