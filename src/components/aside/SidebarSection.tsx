import React from "react";

type SidebarSectionProps = {
  title?: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  action?: React.ReactNode;
};

const SidebarSection = ({
  title,
  children,
  isCollapsed,
  action,
}: SidebarSectionProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && !isCollapsed && (
        <div className="flex items-center justify-between px-3 mb-1 overflow-hidden">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-white/70 select-none whitespace-nowrap truncate">
            {title}
          </p>
          {action && <span className="shrink-0 ml-1">{action}</span>}
        </div>
      )}
      {children}
    </div>
  );
};

export default SidebarSection;
