"use client";

import React from "react";

import { LoginForm, type LoginFormProps } from "./LoginForm";

type LoginCardProps = LoginFormProps;

export function LoginCard(props: LoginCardProps) {
  return (
    <div className="w-full max-w-[520px] rounded-[1.75rem] border border-border bg-surface p-8 shadow-lg sm:p-10">
      <LoginForm {...props} />
    </div>
  );
}
