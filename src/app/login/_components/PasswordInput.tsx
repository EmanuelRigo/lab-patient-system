"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
};

const PasswordInput = ({
  value,
  onChange,
  placeholder = "••••••••",
  required,
  id = "password",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {/* Ícono izquierdo */}
      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />

      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete="current-password"
        className="
          w-full h-[52px] pl-10 pr-11 rounded-xl
          border border-border-default bg-surface
          text-sm text-text-primary placeholder:text-text-muted
          outline-none
          transition-all duration-150
          hover:border-border-strong
          focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />

      {/* Toggle mostrar/ocultar */}
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        tabIndex={-1}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="
          absolute right-3.5 top-1/2 -translate-y-1/2
          text-text-muted hover:text-text-secondary
          transition-colors duration-150
          focus:outline-none
        "
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
