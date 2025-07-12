import React from "react";
import MedicalStudyForm from "@/components/medicalStudies/MedicalStudyForm";

const page = () => {
  return (
    <div className="text-black h-full overflow-y-auto flex flex-col">
      <MedicalStudyForm></MedicalStudyForm>
    </div>
  );
};

export default page;
