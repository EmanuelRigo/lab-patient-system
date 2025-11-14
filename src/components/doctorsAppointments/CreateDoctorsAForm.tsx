"use client";

import {
  Calendar,
  ClipboardList,
  User,
  Stethoscope,
  FileText,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import patientApi from "@/services/patients.api";

import TalonForm from "../talon/TalonForm";

export default function TurnoForm() {
  return (
    <div
      className="h-full relative flex flex-col items-center justify-center mx-auto overflow-hidden rounded-4xl 
      opacity-0 animate-fade-in"
    >
      {/* Encabezado */}
      <div className="w-full flex flex-col items-center pt-10 mb-8 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-100/70 absolute top-36">
          Crear Nuevo Turno Médico
        </h1>
      </div>

      {/* Formulario principal */}
      <div className="w-full flex gap-6 justify-center">
        <form className="w-4/6 bg-white/95 rounded-2xl shadow-xl border border-gray-200 p-10 flex flex-col gap-10 backdrop-blur-md">
          {/* Paciente */}
          <div>
            <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
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
              <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                <Stethoscope className="w-4 h-4 text-sky-600" />
                Estudio médico
              </Label>
              <select className="w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option>Selecciona un estudio</option>
                <option>Radiografía</option>
                <option>Análisis de sangre</option>
                <option>Ecografía</option>
              </select>
            </div>

            <div>
              <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
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
            <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
              <FileText className="w-4 h-4 text-sky-600" />
              Motivo
            </Label>
            <Input
              type="text"
              placeholder="Motivo del turno..."
              className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Estado y Acciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-end">
            {/* Estado */}
            <div>
              <Label className="flex items-center gap-2 text-gray-700 mb-2 font-medium">
                <CheckCircle className="w-4 h-4 text-sky-600" />
                Estado
              </Label>
              <select className="w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                <option>Programada</option>
                <option>Completada</option>
                <option>Cancelada</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-5">
              <Button className="w-full py-7 rounded-lg bg-sky-900/80 hover:bg-sky-700 cursor-pointer text-white flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                <ClipboardList className="w-7 h-7" />
                Crear y agregar Turno
              </Button>

              {/* Campo Total + Botón Pagar */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold text-lg">
                    Total:
                  </span>
                  <span className="text-sky-800 text-2xl font-bold">$343</span>
                </div>

                <Button className="w-full py-7 rounded-lg bg-emerald-700/90 hover:bg-emerald-600 cursor-pointer text-white flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  <CreditCard className="w-7 h-7" />
                  Pagar
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Formulario del talon */}
        <TalonForm />
      </div>
    </div>
  );
}
