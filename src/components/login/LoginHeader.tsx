import React from "react";
import { FlaskConical } from "lucide-react";

/**
 * Encabezado de la card de Login.
 * Solo presentacional: ícono circular, título y subtítulo.
 */
export function LoginHeader() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-primary-100">
        <FlaskConical className="h-5 w-5" strokeWidth={2} />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-text-secondary">
          Inicia sesión para continuar
        </p>
      </div>
    </div>
  );
}
