import { MedicalStudy } from "../../../types/medicalStudy.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class MedicalStudyDTO {
  name: string;
  price: number;
  description: string;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;

  constructor(data: MedicalStudy) {
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    this.price = data.price;
    this.name = data.name;
    this.description = data.description;
    this.duration = data.duration;
  }
}

export default MedicalStudyDTO;
