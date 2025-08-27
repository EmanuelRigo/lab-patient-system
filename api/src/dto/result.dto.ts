import { Result } from "../../../types/result.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class ResultDTO {
  status: "pending" | "status_completed" | "failed";
  biochemist_id?: string;
  labtechnician_id: string;
  extration_date?: Date;
  extractionTime?: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Result) {
    this.status = data.status || "pending";
    this.biochemist_id = data.biochemist_id;
    this.labtechnician_id = data.labtechnician_id;
    this.extration_date = data.extration_date;
    this.extractionTime = data.extractionTime;
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default ResultDTO;
