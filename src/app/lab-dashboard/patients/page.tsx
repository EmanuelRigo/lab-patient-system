import Link from "next/link";
// import { getAllPatient } from "@/services/patients.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { Patient } from "../../../../types/patient.types";
import patientsApi from "@/services/patients.api";

const Page = async () => {
  const patients = await patientsApi.getAll();

  return (
    <div className="bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide">
      <Link
        href="/lab-dashboard/patients/add-patient"
        className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
      >
        Agregar paciente
      </Link>

      <GenericList<Patient>
        items={patients}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard
            item={data}
            title="firstName"
            id="_id"
            fields={["birthDate", "phone", "address"]}
            basePath="lab-dashboard/patients/"
          />
        )}
      />
    </div>
  );
};

export default Page;
