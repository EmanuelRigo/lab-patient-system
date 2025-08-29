import TalonDTO from "../../../dto/talon.dto";
import { Talon } from "../../../../../types/talon.types";

export function toSQL(dto: TalonDTO): Record<string, any> {
  return {
    _id: dto._id,
    receptionist_id: dto.receptionistId,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };
}

export function fromSQL(row: Record<string, any>): TalonDTO {
  const talon: Talon = {
    _id: row._id,
    receptionistId: row.receptionist_id,
    doctorAppointmentId: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new TalonDTO(talon);
}
