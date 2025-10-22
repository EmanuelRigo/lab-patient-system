"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonPanel from "@/components/homepage/ButtonPanel";
import { useLabSystemContext } from "@/context/LabContext";
import sessionApi from "@/services/session.api";

export default function Aside() {
  const { role, setRole } = useLabSystemContext();
  const router = useRouter();
  const pathname = usePathname();
  const [displayedRole, setDisplayedRole] = useState(
    "Cargando rol de usuario..."
  );

  useEffect(() => {
    setDisplayedRole(`El rol actual es: ${role}`);
  }, [role]);

  const handleLogout = async () => {
    try {
      const response = await sessionApi.logout();
      if (response.ok) {
        setRole("public");
        router.push("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // 🚫 Mover la condición DESPUÉS de los hooks
  if (pathname === "/login" || pathname === "/") return null;

  return (
    <div className="h-full aside-slide ">
      <div key={role} className="w-full h-full flex flex-col justify-center">
        {role === "public" ? (
          <p>Bienvenido, por favor inicie sesión</p>
        ) : (
          <>
            <ButtonPanel role={role} />

            <div className="mb-16 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium shadow-sm border-2 border-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                Rol actual: <span className="capitalize">{role}</span>
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="mt-8 w-full px-6 py-3 rounded-e-lg bg-sky-900/80 hover:bg-sky-600 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
