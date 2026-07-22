"use client";

import React from "react";
import { ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLabSystemContext } from "@/context/LabContext";
import { cn } from "@/lib/utils";

/** Genera las iniciales a partir de nombre y apellido */
const getInitials = (firstname?: string, lastname?: string): string => {
  const a = firstname?.trim().charAt(0) ?? "";
  const b = lastname?.trim().charAt(0) ?? "";
  return `${a}${b}`.toUpperCase() || "U";
};

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  receptionist: "Recepcionista",
  labTechnician: "Técnico de Lab.",
  biochemist: "Bioquímico",
  public: "Invitado",
};

const TopbarUser = () => {
  const { userLabData, role } = useLabSystemContext();

  // No renderizar si no hay sesión (igual que el Sidebar)
  if (role === "public" || !userLabData) return null;

  const fullName =
    `${userLabData.firstname ?? ""} ${userLabData.lastname ?? ""}`.trim() ||
    "Usuario";
  const initials = getInitials(userLabData.firstname, userLabData.lastname);
  const roleLabel = ROLE_LABELS[role] ?? role;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Menú de usuario"
          className={cn(
            "flex h-8 items-center gap-2 rounded-full pl-1 pr-2 2xl:h-10",
            "border border-transparent",
            "hover:bg-surface-muted hover:border-border-default",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/30",
            "active:scale-[0.98]"
          )}
        >
          {/* Avatar */}
          <span
            aria-hidden="true"
            className="
              flex h-7 w-7 items-center justify-center rounded-full 2xl:h-8 2xl:w-8
              bg-primary-500 text-white text-xs font-semibold
              shrink-0 select-none
            "
          >
            {initials}
          </span>

          {/* Nombre + rol (se ocultan en pantallas chicas) */}
          <span className="hidden lg:flex flex-col items-start min-w-0 leading-tight">
            <span className="max-w-[160px] truncate text-xs font-semibold text-text-primary 2xl:text-sm">
              {fullName}
            </span>
            <span className="max-w-[160px] truncate text-[10px] text-text-muted 2xl:text-[11px]">
              {roleLabel}
            </span>
          </span>

          <ChevronDown
            aria-hidden="true"
            className="h-3 w-3 shrink-0 text-text-muted 2xl:h-4 2xl:w-4"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="min-w-[200px]">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary">
              {fullName}
            </span>
            <span className="text-xs text-text-muted">{roleLabel}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <UserIcon className="w-4 h-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Settings className="w-4 h-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled>
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopbarUser;
