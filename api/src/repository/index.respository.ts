import DoctorsAppointmentDTO from "../dto/doctorsAppointment.dto";
import LabStaffDTO from "../dto/labStaff.dto";
import MedicalStudyDTO from "../dto/medicalStudy.dto";
import PatientDTO from "../dto/patient.dto";
import PaymentDTO from "../dto/payment.dto";
import ResultDTO from "../dto/result.dto";
import TalonDTO from "../dto/talon.dto";

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
    create: (data: T) => Promise<T>;
    getAll: () => Promise<T[] | null>;
    getById: (id: string) => Promise<T | null>;
    getByName?: (name: string) => Promise<T | null>;
    getByUsername?: (username: string) => Promise<T | null>;
    update: (id: string, data: Partial<T>) => Promise<T | null>;
    deleteOne: (id: string) => Promise<T>;
  };
  private DTO: Constructor<T>;

  constructor(dao: any, dto: Constructor<T>) {
    this.dao = dao;
    this.DTO = dto;
  }

  create = async (data: any): Promise<T> => {
    const formattedData = new this.DTO(data);
    return await this.dao.create(formattedData);
  };

  getAll = async (): Promise<T[] | null> => {
    return await this.dao.getAll();
  };

  getById = async (id: string): Promise<T | null> => {
    return await this.dao.getById(id);
  };

  getByName = async (name: string): Promise<T | null> => {
    if (!this.dao.getByName) throw new Error("getByName not implemented");
    return await this.dao.getByName(name);
  };

  getByUsername = async (username: string): Promise<T | null> => {
    if (!this.dao.getByUsername)
      throw new Error("getByUsername not implemented");
    return await this.dao.getByUsername(username);
  };

  update = async (id: string, data: Partial<T>): Promise<T | null> => {
    return await this.dao.update(id, data);
  };

  deleteOne = async (id: string): Promise<T> => {
    return await this.dao.deleteOne(id);
  };
}

export default Repository;

const DoctorsAppointmentRepository = new Repository(
  DoctorsAppointmentDao,
  DoctorsAppointmentDTO
);
const LabStaffRepository = new Repository(LabStaffDao, LabStaffDTO);
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
