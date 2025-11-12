"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLabSystemContext } from "@/context/LabContext";
import sessionApi from "@/services/session.api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setRole } = useLabSystemContext();

  function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : undefined;
  }

  useEffect(() => {
    const token = getCookie("onlineUser");
    if (token) {
      console.log("onlineUser");
      // router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const response = await sessionApi.login(credentials);

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        const infoUserToken = getCookie("infoUserToken");
        if (infoUserToken) {
          const decoded = JSON.parse(atob(infoUserToken.split(".")[1]));
          setRole(decoded.role);
        }
        setError("");
        router.push("/lab-dashboard/patients");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("No se pudo conectar. Intenta nuevamente.");
    }
  };

  return (
    <div
      className="h-full w-full  relative flex flex-col items-center justify-center mx-auto overflow-hidden rounded-4xl
      opacity-0 animate-fade-in"
    >
      {/* Encabezado */}
      <div className="w-full flex flex-col items-center pt-10 mb-8 z-10">
        <h2 className="font-bold text-2xl  text-sky-100/80 mb-10 mt-2">
          Por favor, inicia sesión para continuar
        </h2>
      </div>

      {/* Contenedor principal */}
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleLogin}
          className="w-4/6 bg-neutral-100 rounded-xl shadow-lg p-10 flex flex-col gap-8"
        >
          {/* Usuario */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2">
              <User className="w-5 h-5 text-sky-600" />
              Usuario
            </Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario..."
              required
              className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Contraseña */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2">
              <Lock className="w-5 h-5 text-sky-600" />
              Contraseña
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Botón */}
          <Button
            type="submit"
            className="w-full py-7 rounded-lg bg-sky-900/80 hover:bg-sky-600 cursor-pointer text-white flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <LogIn className="w-6 h-6" />
            Iniciar Sesión
          </Button>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm font-medium text-center mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
