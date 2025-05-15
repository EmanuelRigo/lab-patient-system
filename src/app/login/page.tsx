"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Aside from "@/components/Aside";

export default function LoginForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí va la lógica real de autenticación
    if (usuario === "admin" && contrasena === "1234") {
      document.cookie = `token=1234; path=/`; // cookie simulada
      router.push("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-full flex ">
      <div className="h-full w-2/6 flex items-center justify-center bg-neutral-100  ">
        <div className=" p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-sky-600">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sky-700 font-medium mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <div>
              <label className="block text-sky-700 font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <Aside></Aside>
    </div>
  );
}
