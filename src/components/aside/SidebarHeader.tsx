import React from "react";
import { FlaskConical } from "lucide-react";

type SidebarHeaderProps = {
  isCollapsed: boolean;
};

const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
    >
      {/* Logo icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/15 shrink-0 shadow-sm">
        <FlaskConical className="w-4 h-4 text-white" />
      </div>

      {/* Lab name + subtitle */}
      {!isCollapsed && (
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-white tracking-wide leading-tight truncate">
            LABSYSTEM
          </span>
          <span className="text-[10px] text-white/70 tracking-widest uppercase truncate leading-tight">
            Clinical Laboratory
          </span>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
