import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
};

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  isCollapsed,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={`
        flex items-center rounded-xl text-sm font-normal text-white/90
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-white/30
        active:scale-95
        ${isCollapsed ? "justify-center py-2 px-0 w-full" : "gap-3 px-3 py-2"}
        ${
          isActive
            ? "bg-white/15 text-white shadow-sm"
            : "hover:bg-white/[0.08] hover:text-white"
        }
      `}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
};

export default SidebarItem;
