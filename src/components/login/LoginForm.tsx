"use client";

import React from "react";
import { User, Lock, LogIn, AlertCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LoginHeader } from "./LoginHeader";
import { PasswordInput } from "./PasswordInput";

export type LoginFormProps = {
  username: string;
  password: string;
  error: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function LoginForm({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <LoginHeader />

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="username"
            className="text-sm font-semibold text-text-secondary"
          >
            <span className="flex items-center gap-2 text-text-secondary">
              <User className="h-4 w-4 text-primary-600" aria-hidden="true" />
              Usuario
            </span>
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
              className="h-[52px] rounded-[1.25rem] border-border bg-surface px-12 pr-4 text-sm shadow-sm transition duration-200 hover:border-primary-400 focus-visible:border-primary-500 focus-visible:ring-primary-200/30"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-text-secondary"
          >
            <span className="flex items-center gap-2 text-text-secondary">
              <Lock className="h-4 w-4 text-primary-600" aria-hidden="true" />
              Contraseña
            </span>
          </Label>
          <PasswordInput
            id="password"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2 select-none text-text-secondary">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-lg border-border text-primary-600 focus:ring-2 focus:ring-primary-500/40 accent-primary-600"
          />
          <span>Recordarme</span>
        </label>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button
        type="submit"
        className="flex h-[52px] w-full items-center justify-center gap-3 rounded-[1.25rem] bg-primary-500 text-white shadow-sm shadow-primary-600/20 transition duration-200 hover:bg-primary-600 hover:shadow-md hover:shadow-primary-600/25 active:bg-primary-700 active:scale-[0.99] focus-visible:ring-primary-500/30"
      >
        <LogIn className="h-4 w-4" />
        <span className="text-sm font-semibold">Iniciar Sesión</span>
      </Button>
    </form>
  );
}
