import PaymentMethodDTO from "../../../dto/paymentMethod.dto";
import { PaymentMethod } from "../../../../../types/paymentMethod.types";

export function toSQL(dto: PaymentMethodDTO): Record<string, any> {
  const raw = {
    _id: dto._id,
    name: dto.name,
    description: dto.description,
    is_active: dto.isActive,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };

  // filtra valores undefined
  return Object.fromEntries(
    Object.entries(raw).filter(([_, value]) => value !== undefined)
  );
}

export function fromSQL(row: Record<string, any>): PaymentMethodDTO {
  const paymentMethod: PaymentMethod = {
    _id: row._id,
    name: row.name,
    description: row.description,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new PaymentMethodDTO(paymentMethod);
}
