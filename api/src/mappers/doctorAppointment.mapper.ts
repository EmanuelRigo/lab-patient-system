import DoctorsAppointmentDTO from "../dto/doctorsAppointment.dto";
import { DoctorAppointment } from "../../../types/doctorsAppointment.types";

export function toSQL(dto: DoctorsAppointmentDTO): Record<string, any> {
  return {
    _id: dto._id,
    is_paid: dto.isPaid,
    talon_id: dto.talonId,
    result_id: dto.resultId,
    patient_id: dto.patientId,
    medical_study_id: dto.medicalStudyId,
    date: dto.date,
    receptionist_id: dto.receptionistId,
    reason: dto.reason,
    status: dto.status,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };
}

export function fromSQL(row: Record<string, any>): DoctorsAppointmentDTO {
  const doctorAppointment: DoctorAppointment = {
    _id: row._id,
    isPaid: row.is_paid,
    talonId: row.talon_id,
    resultId: row.result_id,
    patientId: row.patient_id,
    medicalStudyId: row.medical_study_id,
    date: row.date,
    receptionistId: row.receptionist_id,
    reason: row.reason,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new DoctorsAppointmentDTO(doctorAppointment);
}
