"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";

type PasswordInputProps = {
  /** Valor controlado del input (sin lógica propia, solo visual). */
  value: string;
  /** onChange controlado por el padre. */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder opcional. */
  placeholder?: string;
  /** ID del input para asociar al Label. */
  id?: string;
  /** Marca el input como requerido (mismo prop que el Input original). */
  required?: boolean;
  /** Deshabilita el input. */
  disabled?: boolean;
};

/**
 * Input de contraseña con botón de mostrar/ocultar.
 *
 * No introduce lógica nueva: el estado de visibilidad es local
 * y el valor fluye hacia el padre vía `onChange`.
 */
export function PasswordInput({
  value,
  onChange,
  placeholder = "••••••••",
  id,
  required,
  disabled,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      {/* Ícono decorativo a la izquierda */}
      <Lock
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />

      <Input
        id={id}
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete="current-password"
        className="h-12 rounded-xl border-border bg-surface pl-10 pr-11 text-sm shadow-sm transition-colors hover:border-primary-300 focus-visible:ring-primary-500/30"
      />

      <button
        type="button"
        onClick={() => setIsVisible((v) => !v)}
        disabled={disabled}
        aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={isVisible}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
      >
        {isVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
