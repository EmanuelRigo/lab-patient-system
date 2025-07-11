// import { Patient } from "../../types/patient.types";
// import envsUtils from "@/utils/envs.utils";

// const BACKEND_URL = envsUtils.BACKEND_URL;

// export async function getAllPatient(): Promise<Patient[]> {
//   const res = await fetch(`${BACKEND_URL}/api/patient`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("❌ No se pudo obtener pacientes.");
//   }

//   const data = await res.json();
//   return data.data as Patient[];
// }

// export async function addPatient(patient: Patient): Promise<Patient[]> {
//   const res = await fetch(`${BACKEND_URL}/api/patient`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(patient),
//   });

//   if (!res.ok) {
//     throw new Error("❌ No se pudo crear el paciente.");
//   }

//   console.log("🚀 ~ addPatient ~ res:", res);
//   const data = await res.json();
//   return data.data as Patient[];
// }

import { Patient } from "../../types/patient.types";
import RestApi from "@/services/restApi";

export default new (class PatientApi extends RestApi<Patient> {
  constructor() {
    super("patient");
  }
})();
