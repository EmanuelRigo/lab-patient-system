import PatientModel from "./model/patient.model";
import { Patient } from "../../../../types/patient.types";

class LabStaffDao {
  async getAll(): Promise<Patient[]> {
    return await PatientModel.find().lean();
  }

  async getByName(name: string): Promise<Patient | null> {
    return await PatientModel.findOne({ name }).lean();
  }

  async getById(id: string): Promise<Patient | null> {
    return await PatientModel.findById(id).lean();
  }

  async getByIdAPI(id: string): Promise<Patient | null> {
    return await PatientModel.findOne({ id }).lean();
  }

  async create(data: Patient): Promise<Patient> {
    return await PatientModel.create(data);
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient | null> {
    return await PatientModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  async deleteOne(id: string): Promise<Patient | null> {
    return await PatientModel.findByIdAndDelete(id).lean();
  }
}

const patientDAO = new LabStaffDao();
export default patientDAO;
