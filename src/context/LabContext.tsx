"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MedicalStudy } from "../../types/medicalStudy.types";
import { Role } from "../../types/frontend.types";
import { jwtDecode } from "jwt-decode";

interface LabSystemContextProps {
  medicalStudyList: MedicalStudy[];
  setMedicalStudyList: React.Dispatch<React.SetStateAction<MedicalStudy[]>>;
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

export type UserInfoToken = {
  name: string;
  username: string;
  role: Role;
  _id: string;
  firstname: string;
  lastname: string;
  iat: number;
  exp: number;
};

export const decodeInfoUserTokenCookie = (
  fallback: UserInfoToken | null = null,
): UserInfoToken | null => {
  if (typeof window === "undefined") return fallback;
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith("infoUserToken="));
  if (!cookie) return fallback;
  try {
    const decoded = jwtDecode<UserInfoToken>(cookie.split("=")[1]);
    return { ...decoded, firstname: decoded.name, lastname: "" };
  } catch (e) {
    console.error("Error decoding infoUserToken cookie:", e);
    return fallback;
  }
};

const LabSystemProvider = ({ children }: LabSystemProviderProps) => {
  const [medicalStudyList, setMedicalStudyList] = useState<MedicalStudy[]>([]);
  const initial = decodeInfoUserTokenCookie();
  const [role, setRole] = useState<Role>(initial?.role ?? "admin");
  const [isRoleReady, setIsRoleReady] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [mesaggeToast, setMessageToast] = useState("");
  const [userInfoToken, setUserInfoToken] = useState<UserInfoToken | null>(
    initial,
  );

  useEffect(() => {
    console.log("🔄 Role ha cambiado:", role);
  }, [role]);

  useEffect(() => {
    console.log("✅ userInfoToken (post-render, valor real):", userInfoToken);
  }, [userInfoToken]);

  const value: LabSystemContextProps = {
    medicalStudyList,
    setMedicalStudyList,
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
