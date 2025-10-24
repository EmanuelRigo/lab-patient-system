"use client";

import React, { useState } from "react";
import patientsApi from "@/services/patients.api";
import ErrorModal from "../atomics/ErrorModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toast } from "../atomics/Toast";
import { useRouter } from "next/navigation";
import { useLabSystemContext } from "@/context/LabContext";
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

  const { setShowToast, setMessageToast } = useLabSystemContext();

  const router = useRouter();

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
      setShowToast(true);
      setMessageToast("Paciente agregado con éxito");
      setTimeout(() => setShowToast(false), 3000);
      router.push("/lab-dashboard/patients");
    } catch (error: any) {
      let userMessage = "Ocurrió un error inesperado.";

      if (error instanceof Error) {
        const msg = error.message.toLowerCase();

        if (msg.includes("duplicate entry") && msg.includes("dni")) {
          userMessage = "Ya existe un paciente registrado con ese DNI.";
        } else if (msg.includes("duplicate entry") && msg.includes("email")) {
          userMessage = "Ese correo electrónico ya está en uso.";
        } else if (msg.includes("failed to fetch")) {
          userMessage =
            "No se pudo conectar con el servidor. Intenta nuevamente.";
        } else if (msg.includes("network")) {
          userMessage = "Error de red. Verifica tu conexión a internet.";
        } else {
          userMessage = error.message; // fallback
        }
      }

      setError(userMessage);
    }
  };

  return (
    <>
      {/* <Toast
        message="Paciente agregado con éxito"
        color="green"
        visible={showToast}
      /> */}
      <div
        className=" h-full relative flex flex-col items-center justify-center mx-auto overflow-hidden rounded-4xl
  opacity-0  animate-fade-in"
      >
        <div className="w-full flex flex-col items-center pt-10 mb-8 z-10">
          {/* Título */}
          <h1 className="text-2xl 2xl:text-4xl font-bold text-sky-100/70 absolute top-16  2xl:top-40">
            Agregar Nuevo Paciente
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto bg-neutral-100 rounded-xl shadow-lg p-8 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Columna 1 */}
            <div className=" space-y-4 2xl:space-y-6">
              <div>
                <Label
                  htmlFor="firstname"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <Label htmlFor="secondname" className="text-gray-700 mb-2">
                  <User className="w-4 h-4 text-sky-600" />
                  Segundo Nombre (opcional)
                </Label>
                <Input
                  id="secondname"
                  name="secondname"
                  value={form.secondname}
                  onChange={handleChange}
                  placeholder="Ingresa el segundo nombre"
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="lastname"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4 2xl:space-y-6">
              <div>
                <Label
                  htmlFor="birthDate"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="dni"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="flex items-center gap-2 text-gray-700 mb-2"
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
                  className="rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full md:w-1/2 py-7 rounded-lg bg-sky-900/80 hover:bg-sky-600 cursor-pointer text-white flex items-center justify-center gap-6 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <PlusCircle className="w-10 h-10" />
              Agregar Paciente
            </Button>
          </div>
        </form>
      </div>{" "}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </>
  );
};

export default PatientForm;
