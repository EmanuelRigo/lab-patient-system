"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function QuickActionButton({
  label,
  icon: Icon,
  onClick,
}: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="
      border-none
      bg-transparent
        h-6
        min-w-0
        justify-center
        gap-1.5
        rounded-lg
        px-2
        text-[10px]
        text-text-primary
        shadow-none
        transition-colors
        hover:border-primary
        hover:bg-primary-500/20
        active:bg-surface-muted
        hover:cursor-pointer
      "
    >
      <Icon size={13} className="shrink-0 text-primary" />

      <span className="truncate font-medium">{label}</span>
    </Button>
  );
}
