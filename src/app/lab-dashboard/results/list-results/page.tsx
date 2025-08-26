// import { getAllMedicalStudy } from "@/services/medicalStudies.api";
import resultApi from "@/services/result.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { Result } from "../../../../../types/result.types";

const Page = async () => {
  const results = await resultApi.getAll();

  return (
    <div className="text-black overflow-y-auto flex flex-col bg-sky-800/80 h-2/3 w-2/3 rounded-s-xl p-4 animate-slide">
      <GenericList<Result>
        items={results}
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
