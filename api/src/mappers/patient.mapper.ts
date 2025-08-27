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
