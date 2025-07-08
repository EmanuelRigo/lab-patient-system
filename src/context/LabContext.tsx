"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { MedicalStudy } from "../../types/medicalStudy.types";
import { LabStaff } from "../../types/labStaff.types";

import { Role } from "../../types/frontend.types";

interface LabSystemContextProps {
  medicalStudyList: MedicalStudy[];
  setMedicalStudyList: React.Dispatch<React.SetStateAction<MedicalStudy[]>>;
  userLabData: LabStaff | null;
  setUserLabData: React.Dispatch<React.SetStateAction<LabStaff | null>>;
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
}

export const labSystemContext = createContext<
  LabSystemContextProps | undefined
>(undefined);

export const useLabSystemContext = () => {
  const contextValue = useContext(labSystemContext);
  if (!contextValue) {
    throw new Error("useLabSystemContext debe usarse dentro de MovieProvider");
  }
  return contextValue;
};

interface LabSystemProviderProps {
  children: ReactNode;
}

const LabSystemProvider = ({ children }: LabSystemProviderProps) => {
  const [medicalStudyList, setMedicalStudyList] = useState<MedicalStudy[]>([]);
  const [userLabData, setUserLabData] = useState<LabStaff | null>(null);
  const [role, setRole] = useState<Role>("Public");
  console.log("🚀 ~ LabSystemProvider ~ role:", role);

  const value: LabSystemContextProps = {
    medicalStudyList,
    setMedicalStudyList,
    userLabData,
    setUserLabData,
    role,
    setRole,
  };

  return (
    <labSystemContext.Provider value={value}>
      {children}
    </labSystemContext.Provider>
  );
};

export default LabSystemProvider;
