import { Patient } from "../../types/patient.types";
import RestApi from "@/services/restApi";

export default new (class PatientApi extends RestApi<Patient> {
  constructor() {
    super("patient");
  }
})();
