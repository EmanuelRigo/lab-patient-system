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
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: boolean;
  setMessageToast: React.Dispatch<React.SetStateAction<string>>;
  mesaggeToast?: string;
  userInfoToken: UserInfoToken | null;
  setUserInfoToken: React.Dispatch<React.SetStateAction<UserInfoToken | null>>;
}

export const labSystemContext = createContext<
  LabSystemContextProps | undefined
>(undefined);

export const useLabSystemContext = () => {
  const contextValue = useContext(labSystemContext);
  if (!contextValue) {
    throw new Error(
      "useLabSystemContext debe usarse dentro de LabSystemProvider",
    );
  }
  return contextValue;
};

interface LabSystemProviderProps {
  children: ReactNode;
}

type UserInfoToken = {
  name: string;
  username: string;
  role: Role;
  _id: string;
  iat: number;
  exp: number;
};

const getInitialRole = (): Role => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith("infoUserToken="));
    if (cookie) {
      try {
        const token = cookie.split("=")[1];
        const decoded = jwtDecode<UserInfoToken>(token);
        return decoded.role;
      } catch (e) {
        console.error("Error decoding token on init:", e);
      }
    }
  }
  return "admin";
};

const LabSystemProvider = ({ children }: LabSystemProviderProps) => {
  const [medicalStudyList, setMedicalStudyList] = useState<MedicalStudy[]>([]);
  const [userLabData, setUserLabData] = useState<LabStaff | null>(null);
  const [role, setRole] = useState<Role>(getInitialRole);
  const [isRoleReady, setIsRoleReady] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [mesaggeToast, setMessageToast] = useState("");
  const [userInfoToken, setUserInfoToken] = useState<UserInfoToken | null>(
    null,
  );

  useEffect(() => {
    console.log("🔄 Role ha cambiado:", role);
  }, [role]);

  useEffect(() => {
    console.log("✅ userInfoToken (post-render, valor real):", userInfoToken);
  }, [userInfoToken]);

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
        console.log("📦 decoded (objeto calculado):", decoded);
        console.log(
          "⏱️ userInfoToken del closure (todavía null, React aún no actualizó):",
          userInfoToken,
        );
        setRole(decoded.role);
        setUserInfoToken(decoded);
      } catch (error) {
        console.error("❌ Error decoding infoUserToken:", error);
      }
    }
    setIsRoleReady(true);
  }, []);

  const value: LabSystemContextProps = {
    medicalStudyList,
    setMedicalStudyList,
    userLabData,
    setUserLabData,
    role,
    setRole,
    isRoleReady,
    showToast,
    setShowToast,
    mesaggeToast,
    setMessageToast,
    userInfoToken,
    setUserInfoToken,
  };

  return (
    <labSystemContext.Provider value={value}>
      {children}
    </labSystemContext.Provider>
  );
};

export default LabSystemProvider;
