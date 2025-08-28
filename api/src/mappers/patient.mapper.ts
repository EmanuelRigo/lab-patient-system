import PatientDTO from "../dto/patient.dto";
import { Patient } from "../../../types/patient.types";

export function toSQL(dto: PatientDTO): Record<string, any> {
  return {
    _id: dto._id,
    firstname: dto.firstname,
    secondname: dto.secondname,
    lastname: dto.lastname,
    birth_date: dto.birthDate,
    dni: dto.dni,
    email: dto.email,
    phone: dto.phone,
    address: dto.address,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };
}

export function fromSQL(row: Record<string, any>): PatientDTO {
  const patient: Patient = {
    _id: row._id,
    firstname: row.firstname,
    secondname: row.secondname,
    lastname: row.lastname,
    birthDate: row.birth_date,
    dni: row.dni,
    email: row.email,
    phone: row.phone,
    address: row.address,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new PatientDTO(patient);
}
