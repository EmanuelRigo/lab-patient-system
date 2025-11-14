"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Patient } from "../../../types/patient.types";

interface PatientCardProps {
  patient: Patient;
  onEdit: () => void;
  onView: () => void;
}

export default function PatientCard({
  patient,
  onEdit,
  onView,
}: PatientCardProps) {
  const { firstname, lastname, birthDate } = patient;

  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between px-6">
        <div className="flex flex-col w-2/3">
          <span className="text-sm font-medium text-gray-900">
            {firstname} {lastname}
          </span>
          <span className="text-sm text-muted-foreground">
            {birthDate ? new Date(birthDate).toLocaleDateString() : "Sin fecha"}
          </span>
        </div>

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
