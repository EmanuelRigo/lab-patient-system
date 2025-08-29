import { Patient } from "../../../types/patient.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

class PatientDTO {
  firstname: string;
  secondname?: string;
  lastname: string;
  birthDate: Date;
  dni: number;
  email: string | undefined;
  phone: string | undefined;
  address: string;
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Patient) {
    this.firstname = data.firstname;
    this.secondname = data.secondname;
    this.lastname = data.lastname;
    this.birthDate = new Date(data.birthDate);
    this.dni = data.dni;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
    this._id = data._id ?? crypto.randomBytes(12).toString("hex");
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}

export default PatientDTO;
