"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLabSystemContext } from "@/context/LabContext";
import sessionApi from "@/services/session.api";
import {
  LoginBackground,
  LoginCard,
  LoginFooter,
  LoginHero,
} from "@/components/login";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setRole, setUserLabData } = useLabSystemContext();

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
      console.log(
        "🚀 handleLogin: login response status",
        response.status,
        "ok",
        response.ok,
      );

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        console.log("🚀 handleLogin: cookies after login", document.cookie);
        const infoUserToken = getCookie("infoUserToken");
        if (infoUserToken) {
          const decoded = JSON.parse(atob(infoUserToken.split(".")[1]));
          console.log("🚀 ~ handleLogin ~ decoded:", decoded);
          setRole(decoded.role);
          setUserLabData(decoded);
        }
        setError("");
        router.push("/lab-dashboard/patients");
      } else {
        console.log(
          "🚀 handleLogin: login failed response",
          await response.text(),
        );
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("No se pudo conectar. Intenta nuevamente.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-text-primary w-full">
      <LoginBackground />

      <div className="relative z-10 flex min-h-screen w-full max-w-full overflow-hidden shadow-none">
        <LoginHero />

        <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[520px]">
            <LoginCard
              username={username}
              password={password}
              error={error}
              onUsernameChange={(e) => setUsername(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={handleLogin}
            />
            <LoginFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
