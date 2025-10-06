"use client";

import {
  Calendar,
  ClipboardList,
  User,
  Stethoscope,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TalonForm from "../talon/TalonForm";

export default function TurnoForm() {
  return (
    <div
      className="h-full relative flex flex-col items-center justify-center mx-auto overflow-hidden rounded-4xl 
      opacity-0 animate-fade-in "
    >
      {/* Encabezado */}
      <div className="w-full flex flex-col items-center pt-10 mb-8 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-100/70 absolute top-36">
          Crear Nuevo Turno Médico
        </h1>
      </div>

      {/* Formulario principal */}
      <div className=" w-full flex gap-6 justify-center">
        <form className="w-4/6 bg-neutral-100 rounded-xl shadow-lg p-8 flex flex-col gap-8">
          {/* Paciente */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2">
              <User className="w-4 h-4 text-sky-600" />
              Paciente
            </Label>
            <Input
              type="text"
              placeholder="Buscar paciente..."
              className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Estudio y Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <Label className="flex items-center gap-2 text-gray-700 mb-2">
                <Stethoscope className="w-4 h-4 text-sky-600" />
                Estudio médico
              </Label>
              <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option>Selecciona un estudio</option>
                <option>Radiografía</option>
                <option>Análisis de sangre</option>
                <option>Ecografía</option>
              </select>
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                Fecha y hora
              </Label>
              <Input
                type="datetime-local"
                className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Motivo */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-sky-600" />
              Motivo
            </Label>
            <Input
              type="text"
              placeholder="Motivo del turno..."
              className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Estado y Botón */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-end">
            <div>
              <Label className="flex items-center gap-2 text-gray-700 mb-2">
                <CheckCircle className="w-4 h-4 text-sky-600" />
                Estado
              </Label>
              <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option>Programada</option>
                <option>Completada</option>
                <option>Cancelada</option>
              </select>
            </div>

            <Button className="w-full py-7 rounded-lg bg-sky-900/80 hover:bg-sky-600 cursor-pointer text-white flex items-center justify-center gap-6 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
              <ClipboardList className="w-8 h-8" />
              Crear Turno
            </Button>
          </div>
        </form>
        <TalonForm></TalonForm>
      </div>
    </div>
  );
}
