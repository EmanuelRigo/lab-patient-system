import { Patient } from "../../types/patient.types";
import RestApi from "@/services/restApi";

class PatientApi extends RestApi<Patient> {
  constructor() {
    super("patient");
  }
}

const patientApi = new PatientApi();
export default patientApi;
