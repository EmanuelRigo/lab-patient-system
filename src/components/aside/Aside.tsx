"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonPanel from "@/components/homepage/ButtonPanel";
import { useLabSystemContext } from "@/context/LabContext";
import sessionApi from "@/services/session.api";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

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

  if (pathname === "/login" || pathname === "/") return null;

  return (
    <div key={role} className="h-full flex flex-col justify-evenly aside-slide">
      {role === "public" ? (
        <p>Bienvenido, por favor inicie sesión</p>
      ) : (
        <>
          <div>
            <ButtonPanel role={role} />

            {/* 🔹 Rol + botón Home */}
            <div className="text-center flex items-center justify-center gap-3 mt-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium shadow-sm border-2 border-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                Rol actual: <span className="capitalize">{role}</span>
              </span>

              {/* 🔹 Botón Home redondo */}
              <Link
                href="/"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-700 hover:bg-sky-500 text-white shadow-md hover:shadow-lg transition-all duration-300 border-2 border-sky-300"
                title="Ir al inicio"
              >
                <FaHome className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 🔹 Botón Logout */}
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
  );
}
