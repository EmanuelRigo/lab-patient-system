import { ResultWithData } from "../../../types/result.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class ResultDTO {
  _id: string;
  medicalStudyId: string;
  doctorAppointmentId: string;
  labtechnicianId?: string;
  biochemistId?: string;
  status: "pending" | "completed" | "failed";
  result?: string;
  description?: string;
  extractionDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: ResultWithData) {
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.medicalStudyId = data.medicalStudyId;
    this.doctorAppointmentId = data.doctorAppointmentId;
    this.labtechnicianId = data.labtechnicianId;
    this.biochemistId = data.biochemistId;
    this.status = data.status || "pending";
    this.result = data.result;
    this.description = data.description;
    this.extractionDate = data.extractionDate;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default ResultDTO;
