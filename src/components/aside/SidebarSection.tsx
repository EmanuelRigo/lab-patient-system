import React from "react";

type SidebarSectionProps = {
  title?: string;
  children: React.ReactNode;
  isCollapsed: boolean;
};

const SidebarSection = ({
  title,
  children,
  isCollapsed,
}: SidebarSectionProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && !isCollapsed && (
        <p className="px-3 mb-1 text-[10px] font-semibold tracking-widest uppercase text-white/70 select-none">
          {title}
        </p>
      )}
      {children}
    </div>
  );
};

export default SidebarSection;
