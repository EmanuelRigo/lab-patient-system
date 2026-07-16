import React from "react";
import { Lock } from "lucide-react";

const LoginFooter = () => {
  return (
    <div className="flex items-start gap-2 text-center justify-center mt-2">
      <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-text-muted" />
      <p className="text-xs text-text-muted leading-relaxed max-w-sm">
        Tu información está protegida con los más altos estándares de seguridad.
      </p>
    </div>
  );
};

export default LoginFooter;
