import { Talon } from "../../../types/talon.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class TalonDTO {
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

  constructor(data: Talon) {
    this.IdPatient = data.IdPatient;
    this.IdLabTechnician = data.IdLabTechnician;
    this.IdBiochemist = data.IdBiochemist;
    this.statusPayment = data.statusPayment;
    this.IdPayment = data.IdPayment;
    this.IdReceptionist = data.IdReceptionist;
    this.IdDoctorAppointment = data.IdDoctorAppointment;

    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default TalonDTO;
