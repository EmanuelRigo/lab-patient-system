import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class DoctorsAppointmentDTO {
  _id?: string;
  doctorId: string;
  patientDNI: string;
  date: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: DoctorsAppointment) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    this.doctorId = data.doctorId;
    this.patientDNI = data.patientDNI;
    this.date = data.date;
    this.reason = data.reason;
    this.status = data.status || "scheduled";
  }
}

export default DoctorsAppointmentDTO;
