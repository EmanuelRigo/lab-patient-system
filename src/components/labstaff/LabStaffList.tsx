"use client";

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { getAllLabStaff } from "@/services/labStaff.api";
import LabStaffCard from "./LabStaffCard";
import { LabStaff } from "../../../types/labStaff.types";

// type LabStaff = {
//   id: string;
//   name: string;
//   role: "ADMIN" | "Secretary" | "LabTechnician";
// };

const LabStaffList = () => {
  const [staff, setStaff] = useState<LabStaff[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getAllLabStaff();
        console.log("🚀 ~ fetchStaff ~ data:", data);

        setStaff(data); // suponiendo que ya es un array de LabStaff
      } catch (error) {
        console.error("❌ Error al obtener el personal:", error);
      }
    };

    fetchStaff();
  }, []);

  const handleDelete = (_id: string) => {
    setStaff((prev) => prev.filter((person) => person._id !== _id));
  };

  return (
    <div className="space-y-4 p-2 rounded-lg shadow-md bg-white">
      {staff.map((person) => (
        <LabStaffCard
          key={person._id}
          id={person._id}
          name={person.firstName}
          role={person.role}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default LabStaffList;
