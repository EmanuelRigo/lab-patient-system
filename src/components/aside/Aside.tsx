"use client";
import { useEffect, useState } from "react";
import ButtonPanel from "@/components/homepage/ButtonPanel";
import { useLabSystemContext } from "@/context/LabContext";
import { useRouter } from "next/navigation";
import sessionApi from "@/services/session.api";

export default function Aside() {
  const { role, setRole } = useLabSystemContext();
  const router = useRouter();
  const [displayedRole, setDisplayedRole] = useState(
    "Cargando rol de usuario..."
  );

  useEffect(() => {
    console.log("🔄 Role ha cambiado:", role);
    setDisplayedRole(`El rol actual es: ${role}`);
  }, [role]);

  const handleLogout = async () => {
    try {
      const response = await sessionApi.logout();
      if (response.ok) {
        console.log("Cierre de sesión exitoso");
        setRole("public");
        router.push("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  console.log("🚀 ~ Aside ~ role:", role);
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50/90 p-8">
      <div key={role} className="w-full">
        {role == "public" ? (
          <p>Bienvenido, por favor inicie sesion</p>
        ) : (
          <>
            <ButtonPanel role={role} />
            <p className="text-center text-sm font-semibold mt-4">
              role: {role}
            </p>
            <button
              onClick={handleLogout}
              className="bg-sky-500 hover:bg-sky-600 text-neutral-100 p-4 rounded-md w-full mt-8"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
