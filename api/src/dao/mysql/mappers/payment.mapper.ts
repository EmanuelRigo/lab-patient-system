import PaymentDTO from "../../../dto/payment.dto";
import { Payment } from "../../../../../types/payment.types";

export function toSQL(dto: PaymentDTO): Record<string, any> {
  return {
    _id: dto._id,
    amount: dto.amount,
    method: dto.method,
    talon_id: dto.talonId,
    patient_id: dto.patientId,
    receptionist_id: dto.receptionistId,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };
}

export function fromSQL(row: Record<string, any>): PaymentDTO {
  const payment: Payment = {
    _id: row._id,
    amount: row.amount,
    method: row.method,
    talonId: row.talon_id,
    patientId: row.patient_id,
    receptionistId: row.receptionist_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new PaymentDTO(payment);
}
