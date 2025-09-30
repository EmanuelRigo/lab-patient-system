"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface PatientCardProps {
  firstname: string;
  lastname: string;
  birthDate: Date;
  onEdit: () => void;
  onView: () => void;
}

export default function PatientCard({
  firstname,
  lastname,
  birthDate,
  onEdit,
  onView,
}: PatientCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between px-6">
        {/* Nombre y apellido */}
        <div className="flex flex-col w-2/3">
          <span className="text-sm font-medium text-gray-900">
            {firstname} {lastname}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(birthDate).toLocaleDateString()}
          </span>
        </div>

        {/* Menú de opciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-md hover:bg-muted">
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onView}>👁 Ver datos</DropdownMenuItem>
            <DropdownMenuItem onClick={onEdit}>✏️ Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
