import { Result } from "../../../types/result.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class ResultDTO {
  status: "pending" | "completed" | "failed";
  biochemistId?: string;
  labtechnicianId: string;
  description?: string;
  extractionDate?: Date;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Result) {
    this.status = data.status || "pending";
    this.biochemistId = data.biochemistId;
    this.labtechnicianId = data.labtechnicianId;
    this.description = data.description;
    this.extractionDate = data.extractionDate;
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default ResultDTO;
