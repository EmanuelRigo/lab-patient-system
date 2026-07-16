"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";

type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
};

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
        className="h-[52px] rounded-[1.25rem] border-border bg-surface pl-10 pr-14 text-sm shadow-sm transition duration-200 hover:border-primary-400 focus-visible:border-primary-500 focus-visible:ring-primary-200/30"
      />

      <button
        type="button"
        onClick={() => setIsVisible((v) => !v)}
        disabled={disabled}
        aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={isVisible}
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-border/70 bg-surface text-text-muted transition duration-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
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
