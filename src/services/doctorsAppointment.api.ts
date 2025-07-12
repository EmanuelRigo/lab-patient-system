// import envsUtils from "@/utils/envs.utils";
// import { DoctorsAppointment } from "../../types/doctorsAppointment.types";

// const BACKEND_URL = envsUtils.BACKEND_URL;

// export async function getAllDoctorsAppointment(): Promise<
//   DoctorsAppointment[]
// > {
//   const res = await fetch(`${BACKEND_URL}/api/doctorAppointment`, {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("❌ No se pudo obtener las citas.");
//   }

//   const data = await res.json();
//   return data.data as DoctorsAppointment[];
// }

import { DoctorsAppointment } from "../../types/doctorsAppointment.types";
import RestApi from "./restApi";

export default new (class DoctorsAppointmentApi extends RestApi<DoctorsAppointment> {
  constructor() {
    super("doctorsAppointment");
  }
})();
