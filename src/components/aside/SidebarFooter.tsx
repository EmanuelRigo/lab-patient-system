"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { Role } from "../../../types/frontend.types";

type SidebarFooterProps = {
  role: Role;
  onLogout: () => void;
  isCollapsed: boolean;
};

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  receptionist: "Recepcionista",
  labTechnician: "Técnico de Lab.",
  biochemist: "Bioquímico",
  public: "Invitado",
};

/** Genera las iniciales del rol para el avatar */
const getRoleInitial = (role: string): string => {
  const map: Record<string, string> = {
    admin: "AD",
    receptionist: "RC",
    labTechnician: "LT",
    biochemist: "BQ",
    public: "–",
  };
  return map[role] ?? role.charAt(0).toUpperCase();
};

const SidebarFooter = ({ role, onLogout, isCollapsed }: SidebarFooterProps) => {
  const roleLabel = ROLE_LABELS[role] ?? role;
  const initial = getRoleInitial(role);

  /* ── Estado colapsado: solo avatar + logout ── */
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2 py-3">
        {/* Avatar */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 shrink-0">
          <span className="text-[10px] font-bold text-white select-none">
            {initial}
          </span>
        </div>

        {/* Logout icon button */}
        <button
          onClick={onLogout}
          title="Cerrar sesión"
          className="
            flex items-center justify-center w-8 h-8 rounded-lg
            text-white/70 hover:bg-white/10 hover:text-white
            transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-white/30
            active:scale-90
          "
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* ── Estado expandido: card con info completa ── */
  return (
    <div className="mx-3 mb-1 rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-sm">
      {/* User info row */}
      <div className="flex items-center gap-3 mb-2">
        {/* Avatar */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 shrink-0">
          <span className="text-xs font-bold text-white select-none">
            {initial}
          </span>
        </div>

        {/* Name + role */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white capitalize truncate leading-tight">
            {role}
          </span>
          <span className="text-[11px] text-white/70 truncate leading-tight">
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={onLogout}
        className="
          flex items-center gap-2 w-full px-3 py-2 rounded-lg
          text-sm text-white/90
          hover:bg-white/10 hover:text-white
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-white/30
          active:scale-95
        "
      >
        <LogOut className="w-4 h-4 shrink-0" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};

export default SidebarFooter;
