import { Patient } from "../../../types/patient.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class PatientDTO {
  name: string;
  age: number;
  dni: number;
  email: string | undefined;
  phone: string;
  address: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Patient) {
    this.name = data.name;
    this.age = data.age;
    this.dni = data.dni;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    if (PERSISTENCE !== "MONGO") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default PatientDTO;
