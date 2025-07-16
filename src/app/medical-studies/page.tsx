// import { getAllMedicalStudy } from "@/services/medicalStudies.api";
import Link from "next/link";
import medicalStudiesApi from "@/services/medicalStudies.api";
import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import { MedicalStudy } from "../../../types/medicalStudy.types";

const Page = async () => {
  const medicalStudies = await medicalStudiesApi.getAll();

  return (
    <div className="text-black h-full overflow-y-auto flex flex-col">
      <Link
        href="/medical-studies/add-study"
        className="bg-sky-600 p-2 rounded-lg mb-4 text-white inline-block"
      >
        Agregar estudio medico
      </Link>

      <GenericList<MedicalStudy>
        items={medicalStudies}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard
            item={data}
            title="name"
            id="name"
            fields={["price"]}
            basePath="medical-studies/"
          />
        )}
      />
    </div>
  );
};

export default Page;
