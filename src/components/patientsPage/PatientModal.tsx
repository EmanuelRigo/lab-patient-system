"use client";

import React, { useState } from "react";
import { Patient } from "../../../types/patient.types";
import { X, Pencil, Check, XCircle, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import patientApi from "@/services/patients.api";
import { useLabSystemContext } from "@/context/LabContext";

interface PatientModalProps {
  patient: Patient | null;
  onClose: () => void;
  onUpdate?: (updatedPatient: Partial<Patient>) => void;
}

export default function PatientModal({
  patient,
  onClose,
  onUpdate,
}: PatientModalProps) {
  const { setShowToast, setMessageToast } = useLabSystemContext();
  const [editingField, setEditingField] = useState<keyof Patient | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [localPatient] = useState<Patient | null>(patient);

  if (!localPatient) return null;

  const handleSave = async () => {
    if (!patient || !editingField) return;

    try {
      const updatedPatient = await patientApi.update(patient._id, {
        [editingField]: editedValue,
      });

      // 🔄 Actualiza el modal localmente
      if (onUpdate) {
        onUpdate({ [editingField]: updatedPatient[editingField] });
      }

      // ✅ Mensaje visual de éxito
      setMessageToast("Paciente actualizado correctamente ✅");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      setEditingField(null);
    } catch (error) {
      console.error("❌ Error updating patient:", error);
      setMessageToast("Error al actualizar el paciente ❌");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleEdit = (
    field: keyof Patient,
    currentValue: string | undefined
  ) => {
    setEditingField(field);
    setEditedValue(currentValue || "");
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditedValue("");
  };

  const renderField = (label: string, field: keyof Patient) => {
    const value = localPatient[field] as string | number | Date | undefined;

    // 🗓️ Calendar for birthDate
    if (editingField === field && field === "birthDate") {
      return (
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                {editedValue
                  ? format(new Date(editedValue), "dd/MM/yyyy", { locale: es })
                  : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={editedValue ? new Date(editedValue) : undefined}
                onSelect={(date: Date | undefined) =>
                  setEditedValue(date ? date.toISOString() : "")
                }
                locale={es}
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-700"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 hover:text-red-700"
          >
            <XCircle size={18} />
          </button>
        </div>
      );
    }

    // ✏️ Other text fields
    if (editingField === field) {
      return (
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="border p-1 rounded flex-1"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-700 cursor-pointer"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 hover:text-red-700 cursor-pointer"
          >
            <XCircle size={18} />
          </button>
        </div>
      );
    }

    // 📋 Read mode
    return (
      <div className="flex items-center justify-between gap-2">
        <span>
          <strong>{label}:</strong>{" "}
          {field === "birthDate"
            ? new Date(value as string).toLocaleDateString("es-AR")
            : value?.toString() || "No registrado"}
        </span>

        <button
          onClick={() => handleEdit(field, value?.toString())}
          className="text-sky-600 hover:text-sky-800 cursor-pointer"
        >
          <Pencil size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          Datos del Paciente
        </h2>

        <div className="flex flex-col gap-3 text-gray-700">
          {renderField("Nombre", "firstname")}
          {renderField("Segundo Nombre", "secondname")}
          {renderField("Apellido", "lastname")}
          {renderField("DNI", "dni")}
          {renderField("Teléfono", "phone")}
          {renderField("Email", "email")}
          {renderField("Dirección", "address")}
          {renderField("Fecha de Nacimiento", "birthDate")}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition font-semibold shadow-md"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
