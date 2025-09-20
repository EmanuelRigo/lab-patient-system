import TalonDTO from "../../../dto/talon.dto";
import { TalonView } from "../../../../../types/talon.types";

// --- Mapper para tabla Talon ---
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
  return new TalonDTO(row);
}

// --- Mapper para vista Talon con receptionist y patient ---
export function fromSQLToView(row: Record<string, any>): TalonView {
  return {
    _id: row.talon_id,
    isPaid: !!row.is_paid, // 👈 booleano
    totalAmount: Number(row.total_amount), // 👈 a number
    createdAt: new Date(row.talon_created_at),
    updatedAt: new Date(row.talon_updated_at),
    receptionistFirstName: row.receptionist_firstname,
    receptionistLastName: row.receptionist_lastname,
    patientFirstName: row.patient_firstname,
    patientLastName: row.patient_lastname,
    patientphoneNumber: row.patient_phone,
  };
}
