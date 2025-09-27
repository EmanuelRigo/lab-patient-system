import Link from "next/link";
import { Patient } from "../../../../types/patient.types";
import patientsApi from "@/services/patients.api";

// 👇 función auxiliar para traer pacientes
async function getPatients(): Promise<Patient[]> {
  return await patientsApi.getAll();
}

const Page = async () => {
  const patients = await getPatients(); // 👈 se espera acá

  console.log("🚀 ~ patients:", patients);

  return (
    <div className="bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide">
      <Link
        href="/lab-dashboard/patients/add-patient"
        className="bg-neutral-200  w-full text-center p-2 rounded-lg mb-4 text-neutral-900 border-2 border-sky-400 inline-block"
      >
        Agregar paciente
      </Link>

      <Link
        href="/lab-dashboard/patients/all-patients"
        className="bg-neutral-200  w-full text-center p-2 rounded-lg mb-4 text-neutral-900 border-2 border-sky-400 inline-block"
      >
        Ver pacientes
      </Link>
    </div>
  );
};

export default Page;
