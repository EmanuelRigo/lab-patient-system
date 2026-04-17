import MedicalStudyDTO from "../../../dto/medicalStudy.dto";
import { MedicalStudy } from "../../../../../types/medicalStudy.types";

export function toSQL(dto: MedicalStudyDTO): Record<string, any> {
  const raw = {
    _id: dto._id,
    name: dto.name,
    price: dto.price,
    description: dto.description,
    duration: dto.duration,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };

  // ✅ Filtramos los campos undefined para que solo se actualicen los que vienen
  return Object.fromEntries(
    Object.entries(raw).filter(([_, value]) => value !== undefined)
  );
}

export function fromSQL(row: Record<string, any>): MedicalStudyDTO {
  console.log("🚀 ~ fromSQL ~ row:", row);
  const medicalStudy: MedicalStudy = {
    _id: row._id,
    name: row.name,
    price: row.price,
    description: row.description,
    duration: row.duration,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  console.log("🚀 ~ fromSQL ~ medicalStudy:", medicalStudy);

  return new MedicalStudyDTO(medicalStudy);
}
