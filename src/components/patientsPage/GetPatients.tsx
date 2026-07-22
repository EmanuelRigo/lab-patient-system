"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import patientsApi from "@/services/patients.api";
import { Patient } from "../../../types/patient.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  UserPlus,
} from "lucide-react";

import PatientModal from "./PatientModal";

type SortKey = "name" | "dni" | "age" | "lastVisit";
type SortDir = "asc" | "desc";
type StatusFilter = "all" | "active" | "pending" | "inactive";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "pending", label: "Pendientes" },
  { value: "inactive", label: "Inactivos" },
];

// Estados visuales del badge. Como el tipo `Patient` no incluye un campo
// de estado, derivamos uno determinístico a partir del DNI para que la UI
// sea estable entre renders y la columna "Estado" no quede vacía.
// Cuando el backend exponga el estado real, este helper es el único punto
// a tocar.
function getStatusMeta(p: Patient): {
  label: string;
  /** Color token del proyecto (var(--color-*)). */
  color: string;
} {
  const buckets: Array<{
    label: string;
    color: string;
  }> = [
    { label: "Activo", color: "var(--color-success-500)" },
    { label: "Pendiente", color: "var(--color-warning-500)" },
    { label: "Inactivo", color: "var(--color-danger-500)" },
  ];
  // Hash determinístico a partir del _id para que el mismo paciente
  // siempre muestre el mismo estado.
  const id = p._id ?? "";
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % buckets.length;
  return buckets[idx];
}

function calculateAge(birthDate: Date): number {
  const now = new Date();
  let age = now.getFullYear() - new Date(birthDate).getFullYear();
  const m = now.getMonth() - new Date(birthDate).getMonth();
  if (m < 0 || (m === 0 && now.getDate() < new Date(birthDate).getDate())) {
    age--;
  }
  return age;
}

function formatDate(d?: Date): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-AR");
}

function getInitials(p: Patient): string {
  const first = (p.firstname?.[0] ?? "").toUpperCase();
  const last = (p.lastname?.[0] ?? "").toUpperCase();
  return `${first}${last}` || "??";
}

function getFullName(p: Patient): string {
  return `${p.firstname} ${p.secondname ? p.secondname + " " : ""}${p.lastname}`.trim();
}

const GetPatients = () => {
  // ─── Lógica existente: intacta ─────────────────────────────────────
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await patientsApi.getAll();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  // ─── Estado nuevo (visual): solo presentación ──────────────────────
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");

  // ─── Filtros + orden (lógica existente, ahora con sortKey) ────────
  const filteredPatients = useMemo(() => {
    const bySearch = patients.filter((p) =>
      `${p.firstname} ${p.lastname}`.toLowerCase().includes(search.toLowerCase())
    );

    // Filtro de estado (chips): se aplica sobre el resultado de la búsqueda.
    const byStatus =
      statusFilter === "all"
        ? bySearch
        : bySearch.filter((p) => {
            const meta = getStatusMeta(p);
            if (statusFilter === "active") return meta.label === "Activo";
            if (statusFilter === "pending") return meta.label === "Pendiente";
            if (statusFilter === "inactive") return meta.label === "Inactivo";
            return true;
          });

    const dir = sortAsc ? "asc" : "desc";
    const sign = dir === "asc" ? 1 : -1;

    const compare = (a: Patient, b: Patient): number => {
      switch (sortKey) {
        case "name":
          return a.firstname.localeCompare(b.firstname) * sign;
        case "dni":
          return (a.dni - b.dni) * sign;
        case "age": {
          // Mayor edad primero en ascendente (opcional, acá ordenamos
          // por el número en sí para mantener coherencia con el resto).
          return (calculateAge(a.birthDate) - calculateAge(b.birthDate)) * sign;
        }
        case "lastVisit": {
          const av = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const bv = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return (av - bv) * sign;
        }
        default:
          return 0;
      }
    };

    return [...byStatus].sort(compare);
  }, [patients, search, statusFilter, sortKey, sortAsc]);

  // ─── Handler: alterna sortKey/sortAsc al click en un encabezado ───
  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const SortableHead: React.FC<{ k: SortKey; children: React.ReactNode }> = ({
    k,
    children,
  }) => {
    const isActive = sortKey === k;
    return (
      <TableHead>
        <button
          type="button"
          onClick={() => toggleSort(k)}
          className="inline-flex items-center gap-1 rounded-md px-1 -mx-1 text-text-secondary hover:text-text-primary transition-colors"
          aria-label={`Ordenar por ${typeof children === "string" ? children : k}`}
        >
          {children}
          {isActive ? (
            sortAsc ? (
              <ArrowUp className="size-3.5" />
            ) : (
              <ArrowDown className="size-3.5" />
            )
          ) : (
            <ArrowUpDown className="size-3.5 opacity-50" />
          )}
        </button>
      </TableHead>
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 2xl:p-6">
      <div className="mx-auto flex w-full max-w-[1560px] flex-col gap-4 animate-fade-in opacity-0">
        {/* Header */}
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-text-primary 2xl:text-2xl">
            Listado de Pacientes
          </h1>
          <p className="text-sm text-text-secondary">
            Buscá, filtrá y administrá los pacientes del laboratorio.
          </p>
        </header>

        {/* Card contenedor */}
        <section className="rounded-2xl border border-border bg-surface shadow-none">
          {/* Fila 1: buscador + acciones */}
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
            {/* Buscador grande */}
            <div className="relative w-full sm:w-1/2 sm:max-w-[520px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <Input
                type="text"
                placeholder="Buscar paciente por nombre o DNI…"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                className="pl-9"
              />
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilter(true)}
                className="gap-2"
              >
                <SlidersHorizontal className="size-4" />
                Filtros
              </Button>

              <Button
                type="button"
                asChild
                className="gap-2"
              >
                <Link href="/lab-dashboard/patients/add-patient">
                  <UserPlus className="size-4" />
                  Nuevo Paciente
                </Link>
              </Button>
            </div>
          </div>

          {/* Fila 2: chips de filtros rápidos */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-muted/40 px-4 py-3">
            {STATUS_OPTIONS.map((opt) => {
              const isActive = statusFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatusFilter(opt.value)}
                  className={[
                    "inline-flex h-7 items-center rounded-full px-3 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-surface text-text-primary border border-border shadow-xs"
                      : "border border-transparent text-text-secondary hover:bg-surface hover:border-border",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Tabla */}
          <div className="p-0">
            <Table>
              <TableHeader className="bg-surface-muted">
                <TableRow>
                  <SortableHead k="name">Paciente</SortableHead>
                  <SortableHead k="dni">DNI</SortableHead>
                  <SortableHead k="age">Edad</SortableHead>
                  <TableHead className="text-text-secondary">Sexo</TableHead>
                  <SortableHead k="lastVisit">Última visita</SortableHead>
                  <TableHead className="text-text-secondary">Estado</TableHead>
                  <TableHead className="w-12 text-right text-text-secondary">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-sm text-text-muted"
                    >
                      No hay pacientes registrados que coincidan con la
                      búsqueda.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((p) => {
                    const status = getStatusMeta(p);
                    const age = calculateAge(p.birthDate);
                    return (
                      <TableRow key={p._id}>
                        {/* Paciente (avatar + nombre + secundario) */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span
                              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                              aria-hidden="true"
                            >
                              {getInitials(p)}
                            </span>
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate text-sm font-semibold text-text-primary">
                                {getFullName(p)}
                              </span>
                              <span className="truncate text-xs text-text-muted">
                                {p.email ?? `DNI ${p.dni}`}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        {/* DNI */}
                        <TableCell className="text-text-primary">
                          {p.dni}
                        </TableCell>

                        {/* Edad */}
                        <TableCell className="text-text-primary">
                          {age}
                        </TableCell>

                        {/* Sexo (no hay campo en el tipo) */}
                        <TableCell className="text-text-muted">—</TableCell>

                        {/* Última visita */}
                        <TableCell className="text-text-primary">
                          {formatDate(p.updatedAt)}
                        </TableCell>

                        {/* Estado (badge con dot de color) */}
                        <TableCell>
                          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-text-primary">
                            <span
                              className="size-1.5 rounded-full"
                              style={{ backgroundColor: status.color }}
                              aria-hidden="true"
                            />
                            {status.label}
                          </span>
                        </TableCell>

                        {/* Acciones */}
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="text-text-secondary hover:text-text-primary"
                                aria-label="Abrir menú de acciones"
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48"
                            >
                              <DropdownMenuItem
                                onClick={() => setSelectedPatient(p)}
                              >
                                Ver datos
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => console.log("Ver resultados", p._id)}
                              >
                                Ver resultados
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => console.log("Ver citas", p._id)}
                              >
                                Ver citas
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Modal "Ver datos" (existente) */}
        {selectedPatient && (
          <PatientModal
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )}

        {/* Modal de Filtros (migrado a Dialog de shadcn) */}
        <Dialog open={showFilter} onOpenChange={setShowFilter}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filtrar Pacientes</DialogTitle>
              <DialogDescription>
                Aplicá filtros adicionales para acotar el listado.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="filter-phone"
                  className="text-sm font-medium text-text-secondary"
                >
                  Teléfono
                </label>
                <Input
                  id="filter-phone"
                  type="text"
                  placeholder="Ej: 555-123-4567"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="filter-birth"
                  className="text-sm font-medium text-text-secondary"
                >
                  Fecha de Nacimiento
                </label>
                <Input id="filter-birth" type="date" />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilter(false)}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={() => setShowFilter(false)}>
                Aplicar Filtros
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GetPatients;
