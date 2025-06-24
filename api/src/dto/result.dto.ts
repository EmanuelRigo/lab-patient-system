import { Result } from "../../../types/result.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class ResultDTO {
  status: "pending" | "completed" | "failed";
  IdBiochemist: string;
  IdLabTechnician: string;
  extractionDate?: Date;
  extractionTime?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Result) {
    this.status = data.status || "pending";
    this.IdBiochemist = data.IdBiochemist;
    this.IdLabTechnician = data.IdLabTechnician;
    this.extractionDate = data.extractionDate;
    this.extractionTime = data.extractionTime;
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default ResultDTO;
