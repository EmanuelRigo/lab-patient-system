import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FilterModal = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label>Filtrar por teléfono</Label>
        <Input placeholder="Ej: 555-123-4567" />
      </div>
      <div>
        <Label>Filtrar por fecha de nacimiento</Label>
        <Input type="date" />
      </div>
      {/* Podés agregar más filtros según tu modelo */}
    </div>
  );
};

export default FilterModal;
