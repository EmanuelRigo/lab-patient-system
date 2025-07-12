// import envsUtils from "@/utils/envs.utils";
// import { MedicalStudy } from "../../types/medicalStudy.types";

// const BACKEND_URL = envsUtils.BACKEND_URL;
// console.log("🚀🚀🚀 ~ API_URL:", BACKEND_URL);

// export async function createMedicalStudy(
//   MSData: MedicalStudy
// ): Promise<Response> {
//   console.log("🚀 ~ envsUtils:", envsUtils);
//   const res = await fetch(`${BACKEND_URL}/api/medicalstudy`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(MSData),
//   });
//   return res;
// }

// export async function getAllMedicalStudy(): Promise<MedicalStudy[]> {
//   const res = await fetch(`${BACKEND_URL}/api/medicalstudy`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("❌ No se pudo obtener los estudios medicos.");
//   }

//   const data = await res.json();
//   return data.data as MedicalStudy[];
// }

import { MedicalStudy } from "../../types/medicalStudy.types";
import RestApi from "@/services/restApi";

export default new (class MedicalStudyApi extends RestApi<MedicalStudy> {
  constructor() {
    super("medicalStudy");
  }
})();
