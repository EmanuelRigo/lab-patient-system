import { Patient } from "../../types/patient.types";
import RestApi from "@/services/restApi";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;

class PatientApi extends RestApi<Patient> {
  constructor() {
    super("patient");
  }

  async getByNameLastName(name: string): Promise<Patient[]> {
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

    if (!res.ok) {
      throw new Error("❌ Cannot get patients.");
    }

    const data = await res.json();
    console.log("🚀 ~ PatientApi ~ getByNameLastName ~ data:", data.response);
    return data.response ?? []; // ⬅ evita undefined
  }
}

const patientApi = new PatientApi();
export default patientApi;
