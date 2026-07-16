"use client";

import React from "react";

import { LoginForm, type LoginFormProps } from "./LoginForm";

export function LoginCard(props: LoginFormProps) {
  return (
    <div className="w-full max-w-[520px] rounded-[1.75rem] border border-border bg-surface p-8 shadow-lg sm:p-10">
      <LoginForm {...props} />
    </div>
  );
}
