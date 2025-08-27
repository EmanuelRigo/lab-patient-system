import DoctorsAppointmentDTO from "../dto/doctorsAppointment.dto";
import LabStaffDTO from "../dto/labStaff.dto";
import MedicalStudyDTO from "../dto/medicalStudy.dto";
import PatientDTO from "../dto/patient.dto";
import PaymentDTO from "../dto/payment.dto";
import ResultDTO from "../dto/result.dto";
import TalonDTO from "../dto/talon.dto";

import {
  toSQL as labStaffToSQL,
  fromSQL as labStaffFromSQL,
} from "../mappers/labStaff.mapper";

import dao from "../dao/factory";

const {
  DoctorsAppointmentDao,
  LabStaffDao,
  MedicalStudyDao,
  PatientDao,
  PaymentDao,
  ResultDao,
  TalonDao,
} = dao;

type Constructor<T> = new (data: any) => T;

class Repository<T> {
  private dao: {
    create: (data: Record<string, any>) => Promise<any>;
    getAll: () => Promise<any[] | null>;
    getById: (id: string) => Promise<any | null>;
    search?: (criteria: Record<string, any>) => Promise<any[]>;
    getByName?: (name: string) => Promise<any | null>;
    getByUsername?: (username: string) => Promise<any | null>;
    update: (id: string, data: Record<string, any>) => Promise<any | null>;
    deleteOne: (id: string) => Promise<any>;
  };

  private DTO: Constructor<T>;
  private toSQL?: (dto: T) => Record<string, any>;
  private fromSQL?: (row: Record<string, any>) => T;

  constructor(
    dao: any,
    dto: Constructor<T>,
    mapper?: {
      toSQL?: (dto: T) => Record<string, any>;
      fromSQL?: (row: Record<string, any>) => T;
    }
  ) {
    this.dao = dao;
    this.DTO = dto;
    this.toSQL = mapper?.toSQL;
    this.fromSQL = mapper?.fromSQL;
  }

  create = async (data: any): Promise<T> => {
    const dto = new this.DTO(data);
    const payload = this.toSQL
      ? this.toSQL(dto)
      : (dto as unknown as Record<string, any>);
    const result = await this.dao.create(payload);
    return this.fromSQL ? this.fromSQL(result) : new this.DTO(result);
  };

  getAll = async (): Promise<T[] | null> => {
    const rows = await this.dao.getAll();
    if (!rows) return null;
    return this.fromSQL
      ? rows.map(this.fromSQL)
      : rows.map((r: any) => new this.DTO(r));
  };

  getById = async (id: string): Promise<T | null> => {
    const row = await this.dao.getById(id);
    return row ? (this.fromSQL ? this.fromSQL(row) : new this.DTO(row)) : null;
  };

  getByName = async (name: string): Promise<T | null> => {
    if (!this.dao.getByName) throw new Error("getByName not implemented");
    const row = await this.dao.getByName(name);
    return row ? (this.fromSQL ? this.fromSQL(row) : new this.DTO(row)) : null;
  };

  getByUsername = async (username: string): Promise<T | null> => {
    if (!this.dao.getByUsername)
      throw new Error("getByUsername not implemented");
    const row = await this.dao.getByUsername(username);
    return row ? (this.fromSQL ? this.fromSQL(row) : new this.DTO(row)) : null;
  };

  search = async (criteria: Record<string, any>): Promise<T[]> => {
    if (!this.dao.search) throw new Error("search not implemented");
    const rows = await this.dao.search(criteria);
    return this.fromSQL
      ? rows.map(this.fromSQL)
      : rows.map((r: any) => new this.DTO(r));
  };

  update = async (id: string, data: Partial<T>): Promise<T | null> => {
    const dto = new this.DTO(data);
    const payload = this.toSQL
      ? this.toSQL(dto)
      : (dto as unknown as Record<string, any>);
    const result = await this.dao.update(id, payload);
    return result
      ? this.fromSQL
        ? this.fromSQL(result)
        : new this.DTO(result)
      : null;
  };

  deleteOne = async (id: string): Promise<T> => {
    const result = await this.dao.deleteOne(id);
    return this.fromSQL ? this.fromSQL(result) : new this.DTO(result);
  };
}

export default Repository;

const DoctorsAppointmentRepository = new Repository(
  DoctorsAppointmentDao,
  DoctorsAppointmentDTO
);
const LabStaffRepository = new Repository(LabStaffDao, LabStaffDTO, {
  toSQL: labStaffToSQL,
  fromSQL: labStaffFromSQL,
});
const MedicalStudyRepository = new Repository(MedicalStudyDao, MedicalStudyDTO);
const PatientRepository = new Repository(PatientDao, PatientDTO);
const PaymentRepository = new Repository(PaymentDao, PaymentDTO);
const ResultRepository = new Repository(ResultDao, ResultDTO);
const TalonRepository = new Repository(TalonDao, TalonDTO);

export {
  DoctorsAppointmentRepository,
  LabStaffRepository,
  MedicalStudyRepository,
  PatientRepository,
  PaymentRepository,
  ResultRepository,
  TalonRepository,
};
