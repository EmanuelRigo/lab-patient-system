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
      },
    );

    if (!res.ok) {
<<<<<<< HEAD
      throw new Error("❌ Cannot get patients.");
    }

    const data = await res.json();
    console.log("🚀 ~ PatientApi ~ getByNameLastName ~ data:", data.response);
    return data.response ?? []; // ⬅ evita undefined
=======
      throw new Error("❌ No se pudieron obtener los pacientes por nombre.");
    }

    const data = await res.json();
    return data.response as Patient[];
>>>>>>> 3cb1068fd6d0d58d43b06e26c70e8b1399565948
  }
}

const patientApi = new PatientApi();
export default patientApi;
