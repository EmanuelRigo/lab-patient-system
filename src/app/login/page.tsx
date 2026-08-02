"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLabSystemContext, decodeInfoUserTokenCookie } from "@/context/LabContext";
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
  const { setRole, setUserInfoToken } = useLabSystemContext();

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
        const decoded = decodeInfoUserTokenCookie();
        if (decoded) {
          setRole(decoded.role);
          setUserInfoToken(decoded);
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

  const fillCredentials = (usernameValue: string, passwordValue: string) => {
    setUsername(usernameValue);
    setPassword(passwordValue);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-text-primary w-full">
      <LoginBackground />

      <div className="relative z-10 flex min-h-screen w-full max-w-full overflow-hidden shadow-none">
        <LoginHero />

        <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="flex w-full max-w-[520px] flex-col 2xl:max-w-[520px] xl:max-w-none xl:items-center xl:justify-center">
            {/* Layout apilado (default y 2xl+): card encima, autocompletado debajo */}
            <div className="hidden w-full 2xl:block">
              <div className="w-full max-w-[520px]">
                <LoginCard
                  username={username}
                  password={password}
                  error={error}
                  onUsernameChange={(e) => setUsername(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onSubmit={handleLogin}
                />
                <div className="mt-6 rounded-2xl border border-border bg-background/80 p-4 text-sm text-text-secondary shadow-sm">
                  <p className="mb-3 font-semibold text-text-primary">
                    Autocompletado rápido
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: "Admin",
                        username: "emanueladmin",
                        password: "hola1234",
                      },
                      {
                        label: "Tecnico",
                        username: "emanueltech",
                        password: "hola1234",
                      },
                      {
                        label: "Bioquímico",
                        username: "emanuelbio",
                        password: "hola1234",
                      },
                      {
                        label: "Recepción",
                        username: "emanuelrecep",
                        password: "hola1234",
                      },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() =>
                          fillCredentials(preset.username, preset.password)
                        }
                        className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary-500 hover:text-primary-700"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
                <LoginFooter />
              </div>
            </div>

            {/* Layout horizontal (<2xl): card a la izquierda, autocompletado a la derecha, footer abajo de ambos */}
            <div className="hidden w-full flex-col items-center xl:flex">
              <div className="flex w-full items-stretch justify-center gap-8">
                <div className="w-full max-w-[520px]">
                  <LoginCard
                    username={username}
                    password={password}
                    error={error}
                    onUsernameChange={(e) => setUsername(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onSubmit={handleLogin}
                  />
                </div>
                <div className="flex h-full w-full max-w-[200px] flex-col justify-center gap-4">
                  <div className="rounded-2xl border border-border bg-background/80 p-4 text-sm text-text-secondary shadow-sm">
                    <p className="mb-3 font-semibold text-text-primary">
                      Autocompletado rápido
                    </p>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          label: "Admin",
                          username: "emanueladmin",
                          password: "hola1234",
                        },
                        {
                          label: "Tecnico",
                          username: "emanueltech",
                          password: "hola1234",
                        },
                        {
                          label: "Bioquímico",
                          username: "emanuelbio",
                          password: "hola1234",
                        },
                        {
                          label: "Recepción",
                          username: "emanuelrecep",
                          password: "hola1234",
                        },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            fillCredentials(preset.username, preset.password)
                          }
                          className="w-full rounded-full border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary-500 hover:text-primary-700"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <LoginFooter />
            </div>

            {/* Layout móvil (<xl): card apilado */}
            <div className="block w-full xl:hidden">
              <div className="w-full max-w-[520px]">
                <LoginCard
                  username={username}
                  password={password}
                  error={error}
                  onUsernameChange={(e) => setUsername(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onSubmit={handleLogin}
                />
                <div className="mt-6 rounded-2xl border border-border bg-background/80 p-4 text-sm text-text-secondary shadow-sm">
                  <p className="mb-3 font-semibold text-text-primary">
                    Autocompletado rápido
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: "Admin",
                        username: "emanueladmin",
                        password: "hola1234",
                      },
                      {
                        label: "Gestión",
                        username: "gestionuser",
                        password: "gestor1234",
                      },
                      {
                        label: "Bioquímico",
                        username: "bioquimico",
                        password: "labbio123",
                      },
                      {
                        label: "Recepción",
                        username: "recepcion",
                        password: "recep1234",
                      },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() =>
                          fillCredentials(preset.username, preset.password)
                        }
                        className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary-500 hover:text-primary-700"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
                <LoginFooter />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
