"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import talonApi from "@/services/talon.api";

type Props = {
  onSuccess: (talonId: string) => void;
  receptionistId: string | undefined;
};

export default function AddTalonButton({ onSuccess, receptionistId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAgregarTalon = async () => {
    setLoading(true);
    try {
      if (!receptionistId) throw new Error("No se proporcionó receptionistId");

      // talonApi.create espera un objeto (Partial<Talon>), y devuelve
      // el Talon creado (no un Response). Enviamos el receptionistId
      // dentro del payload.
      const talon = await talonApi.create({ receptionistId });

      // talon._id es el id del talón creado
      onSuccess(talon._id);
    } catch (err) {
      console.error(err);
      alert("Error al crear el talón");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleAgregarTalon}
      className="bg-sky-800 hover:bg-sky-700 text-white px-6 py-4 rounded-xl flex items-center gap-2 text-lg font-semibold"
    >
      <ClipboardList className="w-5 h-5" />
      {loading ? "Creando..." : "Agregar Talón"}
    </Button>
  );
}
