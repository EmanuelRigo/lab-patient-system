import React from "react";
import medicalStudiesApi from "@/services/medicalStudies.api";
import MedicalStudiesCard from "@/components/medicalStudies/MedicalStudiesCard";

const Page = async ({ params }: { params: Promise<{ studyId: string }> }) => {
  const { studyId } = await params;
  const study = await medicalStudiesApi.getByName(decodeURIComponent(studyId));

  return (
    <div className="p-6 text-black">
      <MedicalStudiesCard study={study} />
    </div>
  );
};

export default Page;
