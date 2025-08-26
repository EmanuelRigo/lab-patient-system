import React from "react";
import medicalStudiesApi from "@/services/medicalStudies.api";
import MedicalStudiesCard from "@/components/medicalStudies/MedicalStudiesCard";

const Page = async ({ params }: { params: Promise<{ studyId: string }> }) => {
  const { studyId } = await params;
  const study = await medicalStudiesApi.getByName(decodeURIComponent(studyId));

  return <MedicalStudiesCard study={study} />;
};

export default Page;
