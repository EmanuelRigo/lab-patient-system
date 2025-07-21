import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class DoctorsAppointmentDTO {
  patientId: string;
  medicalStudyId: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: DoctorsAppointment) {
    this.patientId = data.patientId;
    this.medicalStudyId = data.medicalStudyId;
    this.date = data.date;
    this.reason = data.reason;
    this.status = data.status || "scheduled";
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default DoctorsAppointmentDTO;
