// import { getAllMedicalStudy } from "@/services/medicalStudies.api";
import Link from "next/link";
import resultApi from "@/services/result.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { Result } from "../../../../../types/result.types";

const Page = async () => {
  const medicalStudies = await resultApi.getAll();

  return (
    <div className="text-black h-full overflow-y-auto flex flex-col">
      <Link
        href="/medical-studies/add-study"
        className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
      >
        Agregar estudio medico
      </Link>

      <GenericList<Result>
        items={medicalStudies}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard
            item={data}
            title="IdLabTechnician"
            id="_id"
            fields={["extractionTime", "extractionDate"]}
            basePath="lab-dashboard/results/"
          />
        )}
      />
    </div>
  );
};

export default Page;
