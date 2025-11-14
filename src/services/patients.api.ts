import { Patient } from "../../types/patient.types";
import RestApi from "@/services/restApi";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;

class PatientApi extends RestApi<Patient> {
  constructor() {
    super("patient");
  }

  async getByName(name: string): Promise<Patient[]> {
    const res = await fetch(
      `${BACKEND_URL}/api/patient/search?text=${encodeURIComponent(name)}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "🚀 ~ MedicalStudyApi ~ getByName ~ encodeURIComponent(name):",
      encodeURIComponent(name)
    );
    if (!res.ok) {
      throw new Error("❌ No se pudieron obtener los estudios por nombre.");
    }

    const data = await res.json();
    return data.data as MedicalStudy;
  }
}

const patientApi = new PatientApi();
export default patientApi;
