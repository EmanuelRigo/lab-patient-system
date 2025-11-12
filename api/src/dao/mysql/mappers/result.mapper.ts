import ResultDTO from "../../../dto/result.dto";
import { Result } from "../../../../../types/result.types";

export function toSQL(dto: ResultDTO): Record<string, any> {
  const raw = {
    _id: dto._id,
    medical_study_id: dto.medicalStudyId,
    doctor_appointment_id: dto.doctorAppointmentId,
    labtechnician_id: dto.labtechnicianId,
    biochemist_id: dto.biochemistId,
    status: dto.status,
    result: dto.result,
    description: dto.description,
    extraction_date: dto.extractionDate,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };

  // limpiamos los undefined antes de mandar a SQL
  return Object.fromEntries(
    Object.entries(raw).filter(([_, value]) => value !== undefined)
  );
}

export function fromSQL(row: Record<string, any>): ResultDTO {
  return new ResultDTO({
    _id: row._id,
    medicalStudyId: row.medical_study_id,
    doctorAppointmentId: row.doctor_appointment_id,
    labtechnicianId: row.labtechnician_id,
    biochemistId: row.biochemist_id,
    status: row.status,
    result: row.result,
    description: row.description,
    extractionDate: row.extraction_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    appointmentDate: row.appointment_date,
    medicalStudyName: row.study_name,
    resultValue: row.result_value,
    resultDescription: row.result_description,
  });
}
