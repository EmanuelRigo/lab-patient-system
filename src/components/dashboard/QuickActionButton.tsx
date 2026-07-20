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
        h-14
        justify-start
        gap-3
        rounded-2xl
        border-border
        bg-surface
        px-5
        text-text-primary
        hover:bg-surface-muted
        hover:border-brand-300
      "
    >
      <Icon size={20} className="text-brand-600" />

      <span className="font-medium">{label}</span>
    </Button>
  );
}
