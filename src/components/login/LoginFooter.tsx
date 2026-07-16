import React from "react";
import { Lock } from "lucide-react";

export function LoginFooter() {
  return (
    <div className="mt-8 flex items-center justify-center gap-3 text-center text-[13px] text-text-secondary">
      <Lock className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
      <p className="max-w-[460px] leading-6">
        Tu información está protegida con los más altos estándares de seguridad.
      </p>
    </div>
  );
}
