"use client";

import React from "react";
import { User, Lock, LogIn, AlertCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import LoginHeader from "./LoginHeader";
import PasswordInput from "./PasswordInput";

type LoginFormProps = {
  username: string;
  password: string;
  error: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

/**
 * Formulario de Login.
 *
 * No introduce lógica: se renderiza con props controladas
 * por el padre. Solo estiliza los Inputs/Label/Button
 * existentes y los componentes del módulo.
 */
export function LoginForm({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* ── Encabezado ── */}
      <LoginHeader />

      {/* ── Error (Alert elegante) ── */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger-200 bg-danger-50 p-3.5 text-sm text-danger-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger-600" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Usuario ── */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="username"
          className="text-sm font-medium text-text-primary"
        >
          <User className="h-4 w-4 text-text-muted" aria-hidden="true" />
          Usuario
        </Label>
        <div className="relative">
          <User
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <Input
            id="username"
            type="text"
            value={username}
            onChange={onUsernameChange}
            placeholder="Ingresa tu usuario..."
            required
            autoComplete="username"
            className="h-12 rounded-xl border-border bg-surface pl-10 pr-3 text-sm shadow-sm transition-colors hover:border-primary-300 focus-visible:ring-primary-500/30"
          />
        </div>
      </div>

      {/* ── Contraseña ── */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-text-primary"
        >
          <Lock className="h-4 w-4 text-text-muted" aria-hidden="true" />
          Contraseña
        </Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>

      {/* ── Recordarme / Olvidaste contraseña ── */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            className="
              h-4 w-4 rounded border-border
              text-primary-600
              focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-0
              accent-primary-600
            "
          />
          <span className="text-text-secondary">Recordarme</span>
        </label>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* ── Submit ── */}
      <Button
        type="submit"
        className="
          h-13 w-full rounded-xl
          bg-primary-600 text-white
          shadow-sm shadow-primary-600/20
          transition-all duration-200
          hover:bg-primary-700 hover:shadow-md hover:shadow-primary-600/30
          active:scale-[0.99]
          focus-visible:ring-primary-500/40
          mt-2
        "
      >
        <LogIn className="h-4 w-4" />
        <span className="text-sm font-semibold">Iniciar Sesión</span>
      </Button>
    </form>
  );
}
