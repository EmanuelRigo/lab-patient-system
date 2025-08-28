import ResultDTO from "../dto/result.dto";
import { Result } from "../../../types/result.types";

export function toSQL(dto: ResultDTO): Record<string, any> {
  return {
    _id: dto._id,
    status: dto.status,
    labtechnician_id: dto.labtechnicianId,
    biochemist_id: dto.biochemistId,
    description: dto.description,
    extraction_date: dto.extractionDate,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };
}

export function fromSQL(row: Record<string, any>): ResultDTO {
  const result: Result = {
    _id: row._id,
    status: row.status,
    labtechnicianId: row.labtechnician_id,
    biochemistId: row.biochemist_id,
    description: row.description,
    extractionDate: row.extraction_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new ResultDTO(result);
}
