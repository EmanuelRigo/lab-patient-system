"use client";
import React, { useState } from "react";
import {
  Search,
  Stethoscope,
  CheckCircle,
  User,
  Clock,
  Plus,
  X,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- DATOS HARDCODEADOS DE CITAS ---
type Appointment = {
  id: number;
  patientName: string;
  time: string;
  study: string;
  status: string;
  statusColor: string;
};

const hardcodedAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Ana Pérez",
    time: "Hoy, 14:30",
    study: "Radiografía de Tórax",
    status: "Programada",
    statusColor: "bg-sky-200 text-sky-800",
  },
  {
    id: 2,
    patientName: "Juan Gómez",
    time: "Hoy, 18:00",
    study: "Mamografía",
    status: "Badllamada",
    statusColor: "bg-red-200 text-red-800",
  },
  {
    id: 3,
    patientName: "María López",
    time: "Hoy, 18:30",
    study: "Ecografía",
    status: "Completada",
    statusColor: "bg-green-200 text-green-800",
  },
  {
    id: 4,
    patientName: "Carlos Ruiz",
    time: "Hoy, 14:30",
    study: "Andiografía Toráxica",
    status: "Cancelada",
    statusColor: "bg-gray-300 text-gray-700",
  },
  {
    id: 5,
    patientName: "Laura García",
    time: "20:00 - 1:14 AM",
    study: "Ecografía Abdominal",
    status: "Completada",
    statusColor: "bg-green-200 text-green-800",
  },
];

// --- Mapeo de estado -> estilos de badge (Design System) ---
const statusBadgeStyles: Record<string, string> = {
  Programada: "bg-info-100 text-info-700",
  Completada: "bg-success-100 text-success-700",
  Pendiente: "bg-warning-100 text-warning-700",
  Cancelada: "bg-danger-100 text-danger-700",
  Badllamada: "bg-danger-100 text-danger-700",
};

export default function AppointmentOverview() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedStudy, setSelectedStudy] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleClearFilters = () => {
    setPatientSearch("");
    setSelectedStudy("");
    setSelectedDate("");
    setSelectedStatus("");
  };

  const getStatusBadge = (status: string) =>
    statusBadgeStyles[status] ?? "bg-surface-muted text-text-secondary";

  return (
    <div className="w-full bg-surface rounded-2xl border border-border p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-muted">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary">
              Citas Médicas
            </h1>
          </div>
          <p className="text-sm text-text-secondary">
            Busca, filtra y gestiona las citas del laboratorio
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 rounded-xl">
          <Plus className="w-4 h-4" />
          Nueva cita
        </Button>
      </div>

      {/* Buscador principal (ancho completo) */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <Input
          type="text"
          placeholder="Buscar paciente..."
          className="h-11 w-full pl-10 pr-4 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-muted"
          value={patientSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPatientSearch(e.target.value)
          }
        />
      </div>

      {/* Filtros rápidos en fila horizontal */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-text-secondary">
            Filtros rápidos
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Estudio */}
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none z-10" />
            <Select value={selectedStudy} onValueChange={setSelectedStudy}>
              <SelectTrigger className="h-11 min-w-[200px] pl-10 rounded-xl border-border bg-surface text-text-primary">
                <SelectValue placeholder="Todos los estudios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Radiografía">Radiografía</SelectItem>
                <SelectItem value="Mamografía">Mamografía</SelectItem>
                <SelectItem value="Ecografía">Ecografía</SelectItem>
                <SelectItem value="Andiografía Toráxica">
                  Andiografía Toráxica
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Estado */}
          <div className="relative">
            <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none z-10" />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-11 min-w-[180px] pl-10 rounded-xl border-border bg-surface text-text-primary">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Programada">Programada</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
                <SelectItem value="Badllamada">Badllamada</SelectItem>
                <SelectItem value="Cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fecha */}
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none z-10" />
            <Input
              type="datetime-local"
              className="h-11 min-w-[200px] pl-10 rounded-xl border-border bg-surface text-text-primary"
              value={selectedDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedDate(e.target.value)
              }
            />
          </div>

          {/* Limpiar filtros */}
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="h-11 px-4 rounded-xl border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary"
          >
            <X className="w-4 h-4" />
            Limpiar
          </Button>
        </div>
      </div>

      {/* Lista de resultados */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-text-secondary">
            Lista de citas
          </h2>
          <span className="text-xs text-text-muted">
            {hardcodedAppointments.length} resultados
          </span>
        </div>

        <div className="flex flex-col gap-3 max-h-[28rem] overflow-y-auto pr-1">
          {hardcodedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-muted"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Avatar / Icono */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-muted shrink-0">
                  <User className="w-5 h-5 text-text-secondary" />
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-text-primary truncate">
                    {appointment.patientName}
                  </span>
                  <span className="text-sm text-text-secondary truncate">
                    {appointment.study}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted mt-1">
                    <Clock className="w-3 h-3" />
                    {appointment.time}
                  </span>
                </div>
              </div>

              {/* Estado + Acción */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
                <Button
                  size="sm"
                  className="h-9 px-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
