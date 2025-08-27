import { Result } from "../../../types/result.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class ResultDTO {
  status: "pending" | "status_completed" | "failed";
  IdBiochemist?: string;
  IdLabTechnician: string;
  extractionDate?: Date;
  extractionTime?: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Result) {
    this.status = data.status || "pending";
    this.IdBiochemist = data.IdBiochemist;
    this.IdLabTechnician = data.IdLabTechnician;
    this.extractionDate = data.extractionDate;
    this.extractionTime = data.extractionTime;
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default ResultDTO;
