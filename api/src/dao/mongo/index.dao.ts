import DoctorsAppointmentModel from "./model/doctorsAppointment.model";
import LabStaffModel from "./model/labStaff.model";
import MedicalStudyModel from "./model/medicalStudy.model";
import PatientModel from "./model/patient.model";
import PaymentModel from "./model/payment.model";
import ResultModel from "./model/result.model";
import TalonModel from "./model/talon.model";

import { Model } from "mongoose";

class DaoIndexMongo<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getAll = async (): Promise<T[]> => {
    return (await this.model.find().lean()) as T[];
  };
  getById = async (id: string): Promise<T | null> => {
    return (await this.model.findById(id).lean()) as T | null;
  };
  getByName = async (name: string): Promise<T | null> => {
    return (await this.model.findOne({ name }).lean()) as T | null;
  };

  getByUsername = async (username: string): Promise<T | null> => {
    return (await this.model.findOne({ username }).lean()) as T | null;
  };

  create = async (data: Partial<T>): Promise<T> => {
    return (await this.model.create(data)) as T;
  };
  update = async (id: string, data: Partial<T>): Promise<T | null> => {
    return (await this.model.findByIdAndUpdate(id, data, {
      new: true,
    })) as T | null;
  };
  deleteOne = async (id: string): Promise<T | null> => {
    return (await this.model.findByIdAndDelete(id).lean()) as T | null;
  };
}

export default DaoIndexMongo;

const DoctorsAppointmentDaoMongo = new DaoIndexMongo(DoctorsAppointmentModel);
const LabStaffDaoMongo = new DaoIndexMongo(LabStaffModel);
const MedicalStudyDaoMongo = new DaoIndexMongo(MedicalStudyModel);
const PatientDaoMongo = new DaoIndexMongo(PatientModel);
const PaymentDaoMongo = new DaoIndexMongo(PaymentModel);
const ResultDaoMongo = new DaoIndexMongo(ResultModel);
const TalonDaoMongo = new DaoIndexMongo(TalonModel);

export {
  DoctorsAppointmentDaoMongo,
  LabStaffDaoMongo,
  MedicalStudyDaoMongo,
  PatientDaoMongo,
  PaymentDaoMongo,
  ResultDaoMongo,
  TalonDaoMongo,
};
