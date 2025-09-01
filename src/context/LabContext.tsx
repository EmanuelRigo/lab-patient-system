"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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
  isRoleReady: boolean;
}

export const labSystemContext = createContext<
  LabSystemContextProps | undefined
>(undefined);

export const useLabSystemContext = () => {
  const contextValue = useContext(labSystemContext);
  if (!contextValue) {
    throw new Error(
      "useLabSystemContext debe usarse dentro de LabSystemProvider"
    );
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
  const [role, setRole] = useState<Role>("public");
  const [isRoleReady, setIsRoleReady] = useState(false);

  useEffect(() => {
    console.log("🔄 Role ha cambiado:", role);
  }, [role]);

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((c) => c.startsWith(`${name}=`));
      return cookie?.split("=")[1];
    };

    const infoUserToken = getCookie("infoUserToken");

    if (infoUserToken) {
      try {
        const decoded = jwtDecode<UserInfoToken>(infoUserToken);
        setRole(decoded.role);
        setIsRoleReady(true);
      } catch (error) {
        console.error("❌ Error decoding infoUserToken:", error);
        setIsRoleReady(true); // incluso si falla, marcamos como listo
      }
    } else {
      setIsRoleReady(true); // no hay token, pero ya podemos renderizar
    }
  }, []);

  const value: LabSystemContextProps = {
    medicalStudyList,
    setMedicalStudyList,
    userLabData,
    setUserLabData,
    role,
    setRole,
    isRoleReady,
  };

  return (
    <labSystemContext.Provider value={value}>
      {children}
    </labSystemContext.Provider>
  );
};

export default LabSystemProvider;
