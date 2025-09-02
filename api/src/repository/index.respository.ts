import envsUtils from "../utils/envs.utils";

import DoctorsAppointmentDTO from "../dto/doctorsAppointment.dto";
import LabStaffDTO from "../dto/labStaff.dto";
import MedicalStudyDTO from "../dto/medicalStudy.dto";
import PatientDTO from "../dto/patient.dto";
import PaymentDTO from "../dto/payment.dto";
import ResultDTO from "../dto/result.dto";
import TalonDTO from "../dto/talon.dto";

import dao from "../dao/factory";

import {
  toSQL as labStaffToSQL,
  fromSQL as labStaffFromSQL,
} from "../dao/mysql/mappers/labStaff.mapper";

import {
  toSQL as doctorApptToSQL,
  fromSQL as doctorApptFromSQL,
} from "../dao/mysql/mappers/doctorAppointment.mapper";

import {
  toSQL as medicalStudyToSQL,
  fromSQL as medicalStudyFromSQL,
} from "../dao/mysql/mappers/medicalStudy.mapper";

import {
  toSQL as patientToSQL,
  fromSQL as patientFromSQL,
} from "../dao/mysql/mappers/patient.mapper";

import {
  toSQL as paymentToSQL,
  fromSQL as paymentFromSQL,
} from "../dao/mysql/mappers/payment.mapper";

import {
  toSQL as resultToSQL,
  fromSQL as resultFromSQL,
} from "../dao/mysql/mappers/result.mapper";

import {
  toSQL as talonToSQL,
  fromSQL as talonFromSQL,
} from "../dao/mysql/mappers/talon.mapper";

// ===================== Tipos base =====================
type Constructor<T> = new (data: any) => T;

type Mapper<T> = {
  toSQL?: (dto: T) => Record<string, any>;
  fromSQL?: (row: Record<string, any>) => T;
};

type DaoShape = {
  create: (data: Record<string, any>) => Promise<any>;
  getAll: () => Promise<any[] | null>;
  getById: (id: string) => Promise<any | null>;
  search?: (criteria: Record<string, any>) => Promise<any[]>;
  getByName?: (name: string) => Promise<any | null>;
  getByUsername?: (username: string) => Promise<any | null>;
  update: (id: string, data: Record<string, any>) => Promise<any | null>;
  deleteOne: (id: string) => Promise<any>;
};

// Activación de mappers según persistencia
const { PERSISTENCE } = envsUtils;

const isMySQL = String(PERSISTENCE).toLowerCase() === "mysql";
console.log("🚀 ~ isMySQL:", isMySQL);

// Helper: devuelve el mapper solo si estamos en MySQL
const maybeMapper = <T>(mapper: Mapper<T> | undefined): Mapper<T> | undefined =>
  isMySQL ? mapper : undefined;

// ===================== Repositorio genérico =====================
class Repository<T> {
  private dao: DaoShape;
  private DTO: Constructor<T>;
  private toSQL?: (dto: T) => Record<string, any>;
  private fromSQL?: (row: Record<string, any>) => T;

  constructor(dao: DaoShape, dto: Constructor<T>, mapper?: Mapper<T>) {
    this.dao = dao;
    this.DTO = dto;
    this.toSQL = mapper?.toSQL;
    this.fromSQL = mapper?.fromSQL;
  }

  // Escritura: usa DTO y toSQL
  create = async (data: any): Promise<T> => {
    const dto = new this.DTO(data);
    const payload = this.toSQL
      ? this.toSQL(dto)
      : (dto as unknown as Record<string, any>);
    const result = await this.dao.create(payload);
    return this.fromSQL ? this.fromSQL(result) : result;
  };

  // Lectura: no usa DTO
  getAll = async (): Promise<T[] | null> => {
    const rows = await this.dao.getAll();
    if (!rows) return null;
    return this.fromSQL ? rows.map(this.fromSQL) : rows;
  };

  getById = async (id: string): Promise<T | null> => {
    const row = await this.dao.getById(id);
    return row ? (this.fromSQL ? this.fromSQL(row) : row) : null;
  };

  getByName = async (name: string): Promise<T | null> => {
    if (!this.dao.getByName) throw new Error("getByName not implemented");
    const row = await this.dao.getByName(name);
    return row ? (this.fromSQL ? this.fromSQL(row) : row) : null;
  };

  getByUsername = async (username: string): Promise<T | null> => {
    if (!this.dao.getByUsername)
      throw new Error("getByUsername not implemented");

    const row = await this.dao.getByUsername(username);
    console.log("🚀 ~ Repository ~ row:", row);

    return row ? (this.fromSQL ? this.fromSQL(row) : row) : null;
  };

  search = async (criteria: Record<string, any>): Promise<T[]> => {
    if (!this.dao.search) throw new Error("search not implemented");
    const rows = await this.dao.search(criteria);
    return this.fromSQL ? rows.map(this.fromSQL) : rows;
  };

  // Escritura: usa DTO y toSQL
  update = async (id: string, data: Partial<T>): Promise<T | null> => {
    // forzamos updatedAt en cada update
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    const payload = this.toSQL
      ? this.toSQL(updateData as T) // si hay mapper SQL
      : (updateData as Record<string, any>);
    console.log("🚀 ~ Repository ~ payload:", payload);

    let result = await this.dao.update(id, payload);
    console.log("🚀 ~ Repository ~ result (raw):", result);

    // aplicar transformación aquí
    result = result && this.fromSQL ? this.fromSQL(result) : result;

    return result ?? null;
  };

  deleteOne = async (id: string): Promise<T> => {
    const result = await this.dao.deleteOne(id);
    return this.fromSQL ? this.fromSQL(result) : result;
  };
}

export default Repository;

// ===================== DAOs desde la factory =====================
const {
  DoctorsAppointmentDao,
  LabStaffDao,
  MedicalStudyDao,
  PatientDao,
  PaymentDao,
  ResultDao,
  TalonDao,
} = dao;

// ===================== Instancias de repos =====================
// Nota: en Mongo, maybeMapper(...) devolverá undefined y el repo funcionará sin mapper.

const DoctorsAppointmentRepository = new Repository(
  DoctorsAppointmentDao,
  DoctorsAppointmentDTO,
  maybeMapper({
    toSQL: doctorApptToSQL,
    fromSQL: doctorApptFromSQL,
  })
);

const LabStaffRepository = new Repository(
  LabStaffDao,
  LabStaffDTO,
  maybeMapper({
    toSQL: labStaffToSQL,
    fromSQL: labStaffFromSQL,
  })
);

const MedicalStudyRepository = new Repository(
  MedicalStudyDao,
  MedicalStudyDTO,
  maybeMapper({
    toSQL: medicalStudyToSQL,
    fromSQL: medicalStudyFromSQL,
  })
);

const PatientRepository = new Repository(
  PatientDao,
  PatientDTO,
  maybeMapper({
    toSQL: patientToSQL,
    fromSQL: patientFromSQL,
  })
);

const PaymentRepository = new Repository(
  PaymentDao,
  PaymentDTO,
  maybeMapper({
    toSQL: paymentToSQL,
    fromSQL: paymentFromSQL,
  })
);

const ResultRepository = new Repository(
  ResultDao,
  ResultDTO,
  maybeMapper({
    toSQL: resultToSQL,
    fromSQL: resultFromSQL,
  })
);

const TalonRepository = new Repository(
  TalonDao,
  TalonDTO,
  maybeMapper({
    toSQL: talonToSQL,
    fromSQL: talonFromSQL,
  })
);

export {
  DoctorsAppointmentRepository,
  LabStaffRepository,
  MedicalStudyRepository,
  PatientRepository,
  PaymentRepository,
  ResultRepository,
  TalonRepository,
};
