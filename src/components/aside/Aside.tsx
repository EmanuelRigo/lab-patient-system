"use client";
import ButtonPanel from "@/components/homepage/ButtonPanel";
import { useLabSystemContext } from "@/context/LabContext";
import { useRouter } from "next/navigation";
import sessionApi from "@/services/session.api";

export default function Aside() {
  const { role, setRole } = useLabSystemContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await sessionApi.logout();
      if (response.ok) {
        console.log("Cierre de sesión exitoso");
        setRole(null); // Limpia el rol en contexto
        router.push("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50/90 p-8">
      {!role && <p>Cargando rol de usuario...</p>}
      {role && (
        <>
          <ButtonPanel role={role} />
          <button
            onClick={handleLogout}
            className="bg-sky-500 hover:bg-sky-600 text-neutral-100 p-4 rounded-md w-full mt-8"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}
