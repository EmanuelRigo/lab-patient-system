"use client";

import React, { useState } from "react";
import patientsApi from "@/services/patients.api";
import ErrorModal from "../atomics/ErrorModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useLabSystemContext } from "@/context/LabContext";
import {
  User,
  UserRoundPlus,
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
    } catch (error: unknown) {
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

  const handleCancel = () => {
    router.push("/lab-dashboard/patients");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-surface border border-border shrink-0">
          <UserRoundPlus className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text-primary">
            Nuevo paciente
          </h1>
          <p className="text-sm text-text-secondary">
            Complete la información para registrar un nuevo paciente en el
            sistema.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-surface border border-border rounded-2xl gap-4 py-0">
          <CardHeader className="px-6 pt-6 pb-2">
            <CardTitle className="text-lg font-semibold text-text-primary">
              Información del paciente
            </CardTitle>
            <CardDescription className="text-text-secondary">
              Datos personales y de contacto del nuevo registro.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <div className="flex flex-col gap-6">
              {/* Información personal */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <User className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-text-primary">
                    Información personal
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="firstname"
                      className="text-text-primary"
                    >
                      <User className="w-4 h-4 text-primary" />
                      Nombre
                    </Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      value={form.firstname}
                      onChange={handleChange}
                      placeholder="Ingresa el nombre"
                      required
                      autoComplete="given-name"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="lastname"
                      className="text-text-primary"
                    >
                      <User className="w-4 h-4 text-primary" />
                      Apellido
                    </Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      value={form.lastname}
                      onChange={handleChange}
                      placeholder="Ingresa el apellido"
                      required
                      autoComplete="family-name"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="secondname"
                      className="text-text-primary"
                    >
                      <User className="w-4 h-4 text-primary" />
                      Segundo nombre (opcional)
                    </Label>
                    <Input
                      id="secondname"
                      name="secondname"
                      value={form.secondname}
                      onChange={handleChange}
                      placeholder="Ingresa el segundo nombre"
                      autoComplete="additional-name"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="dni" className="text-text-primary">
                      <Fingerprint className="w-4 h-4 text-primary" />
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
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Información del paciente (fecha) */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Calendar className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-text-primary">
                    Información del paciente
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="birthDate"
                      className="text-text-primary"
                    >
                      <Calendar className="w-4 h-4 text-primary" />
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
                      autoComplete="bday"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Phone className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-text-primary">
                    Información de contacto
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-text-primary">
                      <Phone className="w-4 h-4 text-primary" />
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
                      autoComplete="tel"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-text-primary">
                      <Mail className="w-4 h-4 text-primary" />
                      Correo electrónico (opcional)
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      autoComplete="email"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="address" className="text-text-primary">
                      <MapPin className="w-4 h-4 text-primary" />
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Ingresa la dirección completa"
                      required
                      autoComplete="street-address"
                      className="h-11 rounded-xl border-border bg-surface text-text-primary placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-11 px-4 rounded-xl border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="h-11 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <PlusCircle className="w-4 h-4" />
              Guardar paciente
            </Button>
          </CardFooter>
        </Card>
      </form>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default PatientForm;
