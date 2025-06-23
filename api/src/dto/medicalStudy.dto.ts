import { MedicalStudy } from "../../../types/medicalStudy.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class MedicalStudyDTO {
  _id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: MedicalStudy) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    this.name = data.name;
    this.description = data.description;
  }
}
