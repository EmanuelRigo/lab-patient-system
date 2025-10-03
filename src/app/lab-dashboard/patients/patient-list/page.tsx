import React from "react";
import GenericList from "@/components/generics/GenericList";
import patientApi from "@/services/patients.api";
import { Patient } from "../../../../../types/patient.types";
import GenericCard from "@/components/generics/GenericCard";
import GetPatients from "@/components/patientsPage/GetPatients";

const page = async () => {
  return <GetPatients />;
};

export default page;
