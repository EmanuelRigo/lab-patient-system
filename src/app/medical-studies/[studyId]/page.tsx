import React from "react";
import medicalStudiesApi from "@/services/medicalStudies.api";
import MedicalStudiesCard from "@/components/medicalStudies/MedicalStudiesCard";

interface PageProps {
  params: { studyId: string };
}

const Page = async ({ params }: PageProps) => {
  const study = await medicalStudiesApi.getByName(
    decodeURIComponent(params.studyId)
  );

  return (
    <div className="p-6 text-black">
      <MedicalStudiesCard study={study} />
    </div>
  );
};

export default Page;
