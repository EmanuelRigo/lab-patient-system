import { Patient } from "../../../types/patient.types";

class PatientDTO {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;

  constructor(data: Patient) {
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
  }
}

export default PatientDTO;
