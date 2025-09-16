import TalonDTO from "../../../dto/talon.dto";
import { Talon } from "../../../../../types/talon.types";

export function toSQL(dto: TalonDTO): Record<string, any> {
  const raw = {
    _id: dto._id,
    receptionist_id: dto.receptionistId,
    payment_id: dto.paymentId,
    is_paid: dto.isPaid,
    total_amount: dto.totalAmount,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };

  return Object.fromEntries(
    Object.entries(raw).filter(([_, value]) => value !== undefined)
  );
}

export function fromSQL(row: Record<string, any>): TalonDTO {
  const talon: Talon = {
    _id: row._id,
    receptionistId: row.receptionist_id,
    paymentId: row.payment_id,
    isPaid: row.is_paid,
    totalAmount: row.total_amount,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new TalonDTO(talon);
}
