import React from "react";
import { Lock } from "lucide-react";

/**
 * Footer institucional debajo de la card de Login.
 * Solo visual: ícono + mensaje de seguridad.
 */
export function LoginFooter() {
  return (
    <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-text-muted">
      <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <p>
        Tu información está protegida con los más altos estándares de
        seguridad.
      </p>
    </div>
  );
}
