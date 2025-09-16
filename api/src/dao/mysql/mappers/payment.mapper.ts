import PaymentDTO from "../../../dto/payment.dto";
import { Payment } from "../../../../../types/payment.types";

export function toSQL(dto: PaymentDTO): Record<string, any> {
  const raw = {
    _id: dto._id,
    amount: dto.amount,
    talon_id: dto.talonId,
    payment_method_id: dto.paymentMethodId,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };

  return Object.fromEntries(
    Object.entries(raw).filter(([_, value]) => value !== undefined)
  );
}

export function fromSQL(row: Record<string, any>): PaymentDTO {
  const payment: Payment = {
    _id: row._id,
    amount: row.amount,
    talonId: row.talon_id,
    paymentMethodId: row.payment_method_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new PaymentDTO(payment);
}
