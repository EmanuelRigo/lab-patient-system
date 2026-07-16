import React from "react";
import { FlaskConical } from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {/* Icono circular */}
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 shadow-sm">
        <FlaskConical className="w-7 h-7 text-primary-600" />
      </div>

      {/* Títulos */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">
          Bienvenido de nuevo
        </h2>
        <p className="text-sm text-text-muted">
          Inicia sesión para continuar
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
