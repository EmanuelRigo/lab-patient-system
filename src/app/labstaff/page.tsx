import React from "react";
import LabStaffList from "@/components/labstaff/LabStaffList";
import LabStaffForm from "@/components/labstaff/LabStaffForm";

const page = () => {
  return (
    <div className="text-black h-full overflow-y-auto p-6">
      <LabStaffForm></LabStaffForm>
      <LabStaffList />
    </div>
  );
};

export default page;
