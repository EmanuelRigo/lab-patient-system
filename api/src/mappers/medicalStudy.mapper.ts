import MedicalStudyDTO from "../dto/medicalStudy.dto";
import { MedicalStudy } from "../../../types/medicalStudy.types";

export function toSQL(dto: MedicalStudyDTO): Record<string, any> {
  return {
    _id: dto._id,
    name: dto.name,
    price: dto.price,
    description: dto.description,
    duration: dto.duration,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };
}

export function fromSQL(row: Record<string, any>): MedicalStudyDTO {
  const medicalStudy: MedicalStudy = {
    _id: row._id,
    name: row.name,
    price: row.price,
    description: row.description,
    duration: row.duration,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new MedicalStudyDTO(medicalStudy);
}
