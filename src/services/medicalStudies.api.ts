import { MedicalStudy } from "../../types/medicalStudy.types";
import RestApi from "@/services/restApi";
import envsUtils from "@/utils/envs.utils";

const BACKEND_URL = envsUtils.BACKEND_URL;

class MedicalStudyApi extends RestApi<MedicalStudy> {
  constructor() {
    super("medicalStudy");
  }

  async getByName(name: string): Promise<MedicalStudy> {
    const res = await fetch(
      `${BACKEND_URL}/api/medicalStudy/${encodeURIComponent(name)}`,
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

const medicalStudyApi = new MedicalStudyApi();

export default medicalStudyApi;
