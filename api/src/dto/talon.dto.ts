import { Talon } from "../../../types/talon.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class TalonDTO {
  DAppointmentId: string[];
  ReceptionistID?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;

  constructor(data: Talon) {
    this.DAppointmentId = data.DAppointmentId;
    this.ReceptionistID = data.ReceptionistID;
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default TalonDTO;
