"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/users.api";

import Aside from "@/components/Aside";

export default function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : undefined;
  }

  useEffect(() => {
    const token = getCookie("onlineUser");
    if (token) {
      console.log("onlineUser");
      //router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const credentials = {
        username,
        password,
      };
      const response = await loginUser(credentials);
      console.log("🚀🚀🚀  ~ handleLogin ~ response:", response);

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        setError(""); // Limpiamos el error en caso de éxito
        router.push("/");
        // window.location.href = "/";
      } else {
        console.error("Error en el inicio de sesión");
        setError("Email o contraseña incorrecta."); // Actualizamos el estado con el error
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("Error en el inicio de sesión. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="h-full flex ">
      <div className="h-full w-full flex items-center justify-center">
        <div className=" p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-sky-600">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sky-700 font-medium mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-neutral-800"
                required
              />
            </div>

            <div>
              <label className="block text-sky-700 font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 text-neutral-800"
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
    </div>
  );
}
