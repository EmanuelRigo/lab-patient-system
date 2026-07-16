"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SidebarCollapseButtonProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

const SidebarCollapseButton = ({
  isCollapsed,
  onToggle,
}: SidebarCollapseButtonProps) => {
  return (
    <button
      onClick={onToggle}
      title={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      className="
        flex items-center justify-center w-6 h-6 rounded-md shrink-0
        text-white/70 hover:bg-white/10 hover:text-white
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-white/30
        active:scale-90
      "
    >
      {isCollapsed ? (
        <ChevronRight className="w-3.5 h-3.5" />
      ) : (
        <ChevronLeft className="w-3.5 h-3.5" />
      )}
    </button>
  );
};

export default SidebarCollapseButton;
