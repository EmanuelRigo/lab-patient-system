import React from "react";
import PatientForm from "@/components/patientsPage/PatientForm";

const page = () => {
  return (
    <div className=" w-3/4 mx-auto  rounded-xl p-4 animate-slide  flex flex-col border-2 border-neutral-200">
      <PatientForm></PatientForm>
    </div>
  );
};

export default page;
