import { MedicalStudy } from "../../../types/medicalStudy.types";
// import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

// const { PERSISTENCE } = envsUtils;

class MedicalStudyDTO {
  name: string;
  price: number;
  description: string;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string; // ← ya no es opcional

  constructor(data: MedicalStudy) {
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.duration = data.duration;
  }
}

export default MedicalStudyDTO;
