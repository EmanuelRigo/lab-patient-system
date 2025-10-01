"use client";

import React, { useState } from "react";
import patientsApi from "@/services/patients.api";
import ErrorModal from "../atomics/ErrorModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Mail,
  Fingerprint,
  PlusCircle,
} from "lucide-react";

type PatientFormState = {
  firstname: string;
  lastname: string;
  secondname: string;
  birthDate: Date;
  dni: string;
  email: string;
  phone: string;
  address: string;
};

const PatientForm = () => {
  const [form, setForm] = useState<PatientFormState>({
    firstname: "",
    lastname: "",
    secondname: "",
    birthDate: new Date(),
    dni: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await patientsApi.create({
        ...form,
        birthDate: form.birthDate,
        dni: Number(form.dni),
      });
      setForm({
        firstname: "",
        secondname: "",
        lastname: "",
        birthDate: new Date(),
        dni: "",
        email: "",
        phone: "",
        address: "",
      });
      // Opcional: Mostrar un mensaje de éxito o redirigir
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el paciente:", error.message);
        setError(error.message);
      } else {
        console.error("Error desconocido:", error);
        setError("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col" // Añadido padding, fondo y sombra para el "card"
      >
        <h2 className="text-3xl font-bold text-sky-700 mb-8 text-center">
          {" "}
          {/* Centramos el título */}
          Agregar Paciente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {" "}
          {/* Aumentamos gap-y para más espacio vertical */}
          {/* Columna 1 */}
          <div className="space-y-6 flex flex-col">
            {" "}
            {/* Aumentamos space-y para más espacio entre elementos de columna */}
            {/* Nombre */}
            <div className="space-y-1">
              <Label
                htmlFor="firstname"
                className="flex items-center gap-2 text-gray-700"
              >
                <User className="w-4 h-4 text-sky-600" />
                Nombre
              </Label>
              <Input
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Ingresa el nombre"
                required
              />
            </div>
            {/* Segundo Nombre */}
            <div className="space-y-1">
              <Label htmlFor="secondname" className="text-gray-700">
                Segundo Nombre (opcional)
              </Label>
              <Input
                id="secondname"
                name="secondname"
                value={form.secondname}
                onChange={handleChange}
                placeholder="Ingresa el segundo nombre"
              />
            </div>
            {/* Apellido */}
            <div className="space-y-1">
              <Label
                htmlFor="lastname"
                className="flex items-center gap-2 text-gray-700"
              >
                <User className="w-4 h-4 text-sky-600" />
                Apellido
              </Label>
              <Input
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Ingresa el apellido"
                required
              />
            </div>
            {/* Teléfono */}
            <div className="space-y-1">
              <Label
                htmlFor="phone"
                className="flex items-center gap-2 text-gray-700"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                Teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Ingresa el teléfono"
                required
              />
            </div>
          </div>
          {/* Columna 2 */}
          <div className="space-y-6 flex flex-col">
            {" "}
            {/* Aumentamos space-y para más espacio entre elementos de columna */}
            {/* Fecha de nacimiento */}
            <div className="space-y-1">
              <Label
                htmlFor="birthDate"
                className="flex items-center gap-2 text-gray-700"
              >
                <Calendar className="w-4 h-4 text-sky-600" />
                Fecha de nacimiento
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={form.birthDate.toISOString().split("T")[0]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm((prev) => ({
                    ...prev,
                    birthDate: new Date(e.target.value),
                  }))
                }
                required
              />
            </div>
            {/* DNI */}
            <div className="space-y-1">
              <Label
                htmlFor="dni"
                className="flex items-center gap-2 text-gray-700"
              >
                <Fingerprint className="w-4 h-4 text-sky-600" />
                DNI
              </Label>
              <Input
                id="dni"
                name="dni"
                type="number"
                value={form.dni}
                onChange={handleChange}
                placeholder="Ingresa el DNI"
                required
              />
            </div>
            {/* Email */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-gray-700"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                Correo electrónico (opcional)
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
              />
            </div>
            {/* Dirección - Ahora en la segunda columna, pero adaptado para minimalismo si es largo*/}
            <div className="space-y-1">
              {" "}
              {/* Eliminamos md:col-span-2 aquí */}
              <Label
                htmlFor="address"
                className="flex items-center gap-2 text-gray-700"
              >
                <MapPin className="w-4 h-4 text-sky-600" />
                Dirección
              </Label>
              <Input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Ingresa la dirección completa"
                required
              />
            </div>
          </div>
        </div>

        {/* Botón Agregar - Estilo Minimalista y alineado con el flujo de la segunda columna */}
        <div className="mt-8 flex justify-center md:col-span-2">
          {" "}
          {/* Para centrarlo si es necesario en una sola columna en móviles */}
          <Button
            type="submit"
            // Estilo más minimalista: color sólido pero no tan "cuadrado", sin la gran "h-fit"
            className="w-full md:w-1/2 p-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-300 "
          >
            <PlusCircle className="w-7 h-7" />
            {/* Icono más pequeño para un look minimalista */}
            Agregar Paciente
          </Button>
        </div>
      </form>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
};

export default PatientForm;
