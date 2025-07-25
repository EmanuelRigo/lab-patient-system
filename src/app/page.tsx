"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ButtonPanel from "@/components/homepage/ButtonPanel";

import { useLabSystemContext } from "@/context/LabContext";

import { Role } from "../../types/frontend.types";

// type UserInfoToken = {
//   username: string;
//   role: Role;
//   iat: number;
//   exp: number;
// };

export default function DashboardButtons() {
  // const [role, setRole] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  const { role, setRole } = useLabSystemContext();

  // useEffect(() => {
  //   const getCookie = (name: string) => {
  //     const cookies = document.cookie.split("; ");
  //     const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  //     return cookie?.split("=")[1];
  //   };

  //   const token = getCookie("token");
  //   const infoUserToken = getCookie("infoUserToken");

  //   setToken(token || null);

  //   if (infoUserToken) {
  //     try {
  //       const decoded = jwtDecode<UserInfoToken>(infoUserToken);
  //       console.log("📦 Decoded infoUserToken:", decoded);
  //       setRole(decoded.role);
  //       console.log("🚀 ~ useEffect ~ role:", decoded.role);

  //       console.log(role);
  //     } catch (error) {
  //       console.error("❌ Error decoding infoUserToken:", error);
  //     }
  //   }
  // }, []);

  return (
    <div className="h-full flex items-center justify-center ">
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={
            role as "Admin" | "Receptionist" | "LabTechnician" | "Biochemist"
          }
        />
      )}
    </div>
  );
}
