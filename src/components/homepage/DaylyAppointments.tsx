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

// Mocks de íconos (si no tienes Lucide importado)
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const StethoscopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 21L15 15" />
    <path d="M10 20L4 14" />
    <path d="M16 10L10 4" />
    <path d="M16 10L19 7C20.5 5.5 22.5 4.5 24 6" />
    <path d="M4 14L1 17C-0.5 18.5 0.5 20.5 2 22" />
  </svg>
);
// --- FIN Mocks ---

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
    <div className="w-full flex justify-between items-center p-3 mb-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-sky-50">
      <div className="flex flex-col flex-grow">
        {/* Hora */}
        <div className="flex items-center text-sm font-semibold text-sky-700 mb-1">
          <ClockIcon className="w-4 h-4 mr-2" />
          {appointment.time}
        </div>
        {/* Paciente */}
        <div className="flex items-center text-base text-gray-800 font-medium">
          <UserIcon className="w-4 h-4 mr-2 text-gray-500" />
          {appointment.patientName}
        </div>
        {/* Procedimiento */}
        <div className="flex items-center text-xs text-gray-600 mt-0.5">
          <StethoscopeIcon className="w-4 h-4 mr-2 text-gray-400" />
          {appointment.procedure}
        </div>
      </div>

      {/* Estado (Badge) */}
      <span
        className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusClasses(
          appointment.status
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
  const appointments = MOCK_APPOINTMENTS; // Usamos los datos hardcodeados

  return (
    <div className="w-2/7 h-full p-6 bg-white rounded-xl border border-sky-100 shadow-xl flex flex-col justify-between z-20">
      {/* Sección Superior: Título y Descripción */}
      <div className="h-full flex flex-col">
        <h3 className="font-extrabold text-2xl text-gray-800 mb-2">
          Citas de Hoy
        </h3>
        <p className="text-sm font-medium text-sky-600 pb-3 mb-4 border-b border-sky-200">
          Vista rápida de las citas programadas para el día.
        </p>
        {/* Contenedor de la Lista de Citas */}
        <div className="grow-2 overflow-y-auto pr-2 scrollbar-hidden">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentItem key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <div className="text-center p-4 bg-sky-50 rounded-lg">
              <p className="text-gray-500 font-medium">
                No hay citas programadas para hoy.
              </p>
            </div>
          )}
        </div>{" "}
        <div className="mt-4 pt-3 border-t border-sky-100">
          <Link
            className="text-sm text-sky-700 hover:text-sky-900 font-medium transition-colors"
            href={"/lab-dashboard/doctors-appointment/appointment-list"}
          >
            Ver todas las citas →
          </Link>
        </div>
      </div>

      {/* Sección Inferior: Enlace a la Lista Completa */}
    </div>
  );
};

// Componente App de demostración para visualización
const App = () => <DailyAppointments />;

export default App;
