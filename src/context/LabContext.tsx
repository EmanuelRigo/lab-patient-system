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

import { jwtDecode } from "jwt-decode";

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

type UserInfoToken = {
  username: string;
  role: Role;
  iat: number;
  exp: number;
};

const LabSystemProvider = ({ children }: LabSystemProviderProps) => {
  const [medicalStudyList, setMedicalStudyList] = useState<MedicalStudy[]>([]);
  const [userLabData, setUserLabData] = useState<LabStaff | null>(null);
  const [role, setRole] = useState<Role>("Public");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((c) => c.startsWith(`${name}=`));
      return cookie?.split("=")[1];
    };

    const token = getCookie("token");
    const infoUserToken = getCookie("infoUserToken");

    setToken(token || null);

    if (infoUserToken) {
      try {
        const decoded = jwtDecode<UserInfoToken>(infoUserToken);
        console.log("📦 Decoded infoUserToken:", decoded);
        setRole(decoded.role);
        console.log("🚀 ~ useEffect ~ role:", decoded.role);

        console.log(role);
        // console.log("🚀 ~ LabSystemProvider ~ role:", role);
      } catch (error) {
        console.error("❌ Error decoding infoUserToken:", error);
      }
    }
  }, []);

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
