import React from "react";
// En tu entorno real:
// import Link from "next/link";
// import { Clock, User, Stethoscope } from "lucide-react";
// Asumo que tienes iconos como Clock, User y Stethoscope

// --- DEFINICIÓN DE TIPOS TSX ---
interface Appointment {
  id: string;
  time: string;
  patientName: string;
  procedure: string;
  status: "Programada" | "En curso" | "Cancelada" | "Completada";
}

// Interfaz de Props para el componente principal
// interface DailyAppointmentsProps {}

// --- Mocks para simular dependencias de Next.js y Lucide ---
// Mock de Link
const Link = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) => (
  <a
    href={href}
    className={className}
    onClick={(e) => {
      e.preventDefault();
      console.log(`Navegando a: ${href}`);
    }}
  >
    {children}
  </a>
);

// --- FIN Mocks ---

const MAX_VISIBLE_APPOINTMENTS = 3;

// Datos de ejemplo Hardcodeados
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "a001",
    time: "08:30",
    patientName: "Sofía Martínez",
    procedure: "Tomografía Computarizada",
    status: "Programada",
  },
  {
    id: "a002",
    time: "09:45",
    patientName: "Juan Pérez",
    procedure: "Consulta General",
    status: "En curso",
  },
  {
    id: "a003",
    time: "11:00",
    patientName: "Elena Rodríguez",
    procedure: "Análisis de Sangre",
    status: "Completada",
  },
  {
    id: "a001",
    time: "08:30",
    patientName: "Sofía Martínez",
    procedure: "Tomografía Computarizada",
    status: "Programada",
  },
  {
    id: "a002",
    time: "09:45",
    patientName: "Juan Pérez",
    procedure: "Consulta General",
    status: "En curso",
  },
  {
    id: "a003",
    time: "11:00",
    patientName: "Elena Rodríguez",
    procedure: "Análisis de Sangre",
    status: "Completada",
  },
  {
    id: "a001",
    time: "08:30",
    patientName: "Sofía Martínez",
    procedure: "Tomografía Computarizada",
    status: "Programada",
  },
  {
    id: "a002",
    time: "09:45",
    patientName: "Juan Pérez",
    procedure: "Consulta General",
    status: "En curso",
  },
  {
    id: "a003",
    time: "11:00",
    patientName: "Elena Rodríguez",
    procedure: "Análisis de Sangre",
    status: "Completada",
  },
  // { id: 'a004', time: '12:30', patientName: 'Roberto Gómez', procedure: 'Radiografía', status: 'Programada', },
];

/**
 * Componente individual para cada cita en la lista.
 * @param {Appointment} appointment - Datos de la cita a mostrar.
 */
const AppointmentItem: React.FC<{ appointment: Appointment }> = ({
  appointment,
}) => {
  // Función para determinar el color del estado
  const getStatusClasses = (status: Appointment["status"]) => {
    switch (status) {
      case "Programada":
        return "bg-blue-100 text-blue-800";
      case "En curso":
        return "bg-yellow-100 text-yellow-800";
      case "Completada":
        return "bg-green-100 text-green-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`mb-2 flex w-full items-center justify-between gap-2 border-b border-border py-1.5 last:mb-0 last:border-b-0`}
    >
      <span className="shrink-0 text-xs font-semibold text-primary">
        {appointment.time}
      </span>
      <span className="min-w-0 truncate text-xs text-text-primary">
        {appointment.patientName}
      </span>
      <span
        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${getStatusClasses(
          appointment.status,
        )}`}
      >
        {appointment.status}
      </span>
    </div>
  );
};

/**
 * Componente principal para mostrar las citas del día.
 */
const DailyAppointments: React.FC = () => {
  const visibleAppointments = MOCK_APPOINTMENTS.slice(
    0,
    MAX_VISIBLE_APPOINTMENTS,
  );

  return (
    <div
      className="flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-3 shadow-none"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border pb-2">
          <h3 className="text-base font-semibold text-text-primary">
            Citas de Hoy
          </h3>
          <Link
            className="text-xs font-medium text-primary transition-colors hover:text-primary-700"
            href={"/lab-dashboard/doctors-appointment/appointment-list"}
          >
            Ver todas →
          </Link>
        </div>
        <div className="mt-2 min-h-0 flex-1 overflow-y-auto scrollbar-hidden">
          {visibleAppointments.length > 0 ? (
            visibleAppointments.map((appointment, index) => (
              <AppointmentItem
                key={`${appointment.id}-${index}`}
                appointment={appointment}
              />
            ))
          ) : (
            <div className="rounded-2xl bg-surface-muted p-4 text-center">
              <p className="text-sm font-medium text-text-secondary">
                No hay citas programadas para hoy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente App de demostración para visualización
const App = () => <DailyAppointments />;

export default App;
