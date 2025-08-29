import LabStaffDTO from "../../../dto/labStaff.dto";
import { LabStaff } from "../../../../../types/labStaff.types";

export function toSQL(dto: LabStaffDTO): Record<string, any> {
  const raw = {
    _id: dto._id,
    firstname: dto.firstname,
    secondname: dto.secondname,
    lastname: dto.lastname,
    username: dto.username,
    password: dto.password,
    role: dto.role,
    email: dto.email,
    phone: dto.phone,
    is_online: dto.isOnline,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt,
  };

  return Object.fromEntries(
    Object.entries(raw).filter(([_, value]) => value !== undefined)
  );
}

// snake_case → camelCase (desde SQL)
export function fromSQL(row: Record<string, any>): LabStaffDTO {
  const labStaff: LabStaff = {
    _id: row._id,
    firstname: row.firstname,
    secondname: row.secondname,
    lastname: row.lastname,
    username: row.username,
    password: row.password,
    role: row.role,
    email: row.email,
    phone: row.phone,
    isOnline: row.is_online,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return new LabStaffDTO(labStaff);
}
