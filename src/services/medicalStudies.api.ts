import envsUtils from "@/utils/envs.utils";
import { MedicalStudy } from "../../types/medicalStudy.types";

const BACKEND_URL = envsUtils.BACKEND_URL;
console.log("🚀🚀🚀 ~ API_URL:", BACKEND_URL);

export async function createMedicalStudy(
  MSData: MedicalStudy
): Promise<Response> {
  console.log("🚀 ~ envsUtils:", envsUtils);
  const res = await fetch(`${BACKEND_URL}/api/medicalstudy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(MSData),
  });
  return res;
}
