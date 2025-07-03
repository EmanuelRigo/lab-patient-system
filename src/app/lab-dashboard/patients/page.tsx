import React from "react";
import PatientList from "@/components/patientsPage/PatientList";
const page = () => {
  return (
    <div className="text-black f-full overflow-y-auto p-6">
      <PatientList />
    </div>
  );
};

export default page;
