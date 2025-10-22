"use client";
import React, { useState } from "react";
import {
  Search,
  Calendar,
  Stethoscope,
  CheckCircle,
  User,
  Clock,
  Plus,
  ClipboardList,
} from "lucide-react";

// --- Componentes Mock para simular ShadCN/UI ---
// Usamos mocks para asegurar la compatibilidad con el entorno.
const Input = (props: any) => (
  <input {...props} className={"p-2 border rounded-lg " + props.className} />
);
const Label = (props: any) => (
  <label
    {...props}
    className={"text-gray-700 font-medium " + props.className}
  />
);
const Button = (props: any) => (
  <button
    {...props}
    className={"text-white rounded-lg p-2 " + props.className}
  />
);
// -----------------------------------------------

// --- DATOS HARDCODEADOS DE CITAS (Actualizados con detalles de estudio y hora) ---
const hardcodedAppointments = [
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

export default function AppointmentOverview() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedStudy, setSelectedStudy] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  return (
    // Contenedor ÚNICO principal: Flex para dos columnas, fondo gris claro y sombra.
    // **Distribución clave:** flex gap-8 items-start

    <div className="w-full  bg-neutral-100 rounded-xl shadow-lg p-8 flex gap-8 items-start">
      {/* Columna de Filtros (Izquierda): Ancho fijo, separación visual con borde derecho */}
      {/* **Distribución clave:** w-full max-w-sm border-r pr-6 border-gray-200 */}
      <div className="flex flex-col gap-6 w-full max-w-sm border-r pr-6 border-gray-200">
        <h2 className="text-xl font-bold text-sky-800 border-b pb-2">
          Filtros de Citas
        </h2>

        {/* 1. Paciente / Búsqueda */}
        <div>
          <Label className="flex items-center gap-2 text-gray-700 mb-2">
            <User className="w-4 h-4 text-sky-600" />
            Paciente
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar paciente..."
              className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 pl-10 bg-white"
              value={patientSearch}
              onChange={(e: any) => setPatientSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 2. Estudio Médico */}
        <div>
          <Label className="flex items-center gap-2 text-gray-700 mb-2">
            <Stethoscope className="w-4 h-4 text-sky-600" />
            Estudio médico
          </Label>
          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            value={selectedStudy}
            onChange={(e) => setSelectedStudy(e.target.value)}
          >
            <option value="">Todos los estudios</option>
            <option value="Radiografía">Radiografía</option>
            <option value="Mamografía">Mamografía</option>
            <option value="Ecografía">Ecografía</option>
            <option value="Andiografía Toráxica">Andiografía Toráxica</option>
          </select>
        </div>

        {/* 3. Fecha y Hora */}
        <div>
          <Label className="flex items-center gap-2 text-gray-700 mb-2">
            <Calendar className="w-4 h-4 text-sky-600" />
            Fecha y hora
          </Label>
          <Input
            type="datetime-local" // Usamos datetime-local para incluir hora
            className="w-full rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500 bg-white"
            value={selectedDate}
            onChange={(e: any) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* 4. Estado */}
        <div>
          <Label className="flex items-center gap-2 text-gray-700 mb-2">
            <CheckCircle className="w-4 h-4 text-sky-600" />
            Estado
          </Label>
          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Programada">Programada</option>
            <option value="Completada">Completada</option>
            <option value="Badllamada">Badllamada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>

        {/* Botón de Acción Principal (Buscar Citas) */}
        <Button className="w-full py-3 rounded-lg bg-sky-900/80 hover:bg-sky-600 cursor-pointer text-white flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg mt-4">
          <ClipboardList className="w-6 h-6" />
          Buscar Citas
        </Button>
      </div>

      {/* Columna de Lista de Citas (Derecha): Ocupa el espacio restante */}
      {/* **Distribución clave:** flex-grow para tomar el espacio sobrante */}
      <div className="flex flex-col gap-4 flex-grow">
        <h2 className="text-xl font-bold text-sky-800 mb-2 border-b pb-2">
          Resultados de Citas
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {" "}
          {/* Scroll para lista larga */}
          {hardcodedAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-sky-500 flex items-center justify-between transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-sky-700" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {appointment.patientName}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    {appointment.study}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}
                >
                  {appointment.status}
                </span>
                <button
                  title="Agregar al Turno Actual"
                  className="bg-sky-500 text-white rounded-full p-2 hover:bg-sky-600 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
