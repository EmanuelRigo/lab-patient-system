"use client";

import React from "react";
import LabStaffList from "@/components/labstaff/LabStaffList";
import LabStaffForm from "@/components/labstaff/LabStaffForm";

const Page = () => {
  return (
    <div className="h-full p-6  flex flex-col text-black">
      <LabStaffForm />

      {/* Contenedor flexible con scroll si hay overflow */}
      <div className="flex-1 overflow-y-auto mt-4 scrollbar-hidden">
        <LabStaffList />
      </div>
    </div>
  );
};

export default Page;
