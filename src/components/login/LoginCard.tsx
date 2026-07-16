"use client";

import React from "react";

import LoginForm from "./LoginForm";

type LoginCardProps = LoginFormProps;

/**
 * Card de Login (520px en desktop, padding amplio,
 * borde redondeado, sombra suave, fondo surface).
 *
 * Solo presentacional: recibe las props controladas
 * del padre (el `page.tsx`) sin introducir lógica.
 */
export function LoginCard(props: LoginCardProps) {
  return (
    <div
      className="
        w-full max-w-[520px]
        rounded-2xl border border-border
        bg-surface
        p-8 sm:p-10
        shadow-xl shadow-secondary-900/[0.04]
      "
    >
      <LoginForm {...props} />
    </div>
  );
}
