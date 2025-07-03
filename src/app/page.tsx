"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ButtonPanel from "@/components/homepage/ButtonPanel";

// Tipo para los datos del token
type UserInfoToken = {
  username: string;
  role: "Admin" | "Secretary" | "LabTechnician"; // Ajustalo a tus roles reales
  iat: number;
  exp: number;
};

export default function DashboardButtons() {
  const [role, setRole] = useState<string | null>(null);
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
      } catch (error) {
        console.error("❌ Error decoding infoUserToken:", error);
      }
    }
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <ButtonPanel
          role={role as "Admin" | "Secretary" | "LabTechnician" | "Biochemist"}
        />
      )}
    </div>
  );
}
