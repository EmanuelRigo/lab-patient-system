import PatientModel from "./model/patient.model";
import { ObjectId } from "mongoose";

class PatientDao {
  async getAll(): Promise<Record<string, any>[]> {
    return await PatientModel.find().lean();
  }

  async getById(id: string): Promise<Record<string, any> | null> {
    return await PatientModel.findById(id).lean();
  }

  async getByIdAPI(id: string): Promise<Record<string, any> | null> {
    return await PatientModel.findOne({ id }).lean();
  }

  async create(data: Record<string, any>): Promise<Record<string, any>> {
    return await PatientModel.create(data);
  }

  async update(
    id: string,
    data: Record<string, any>
  ): Promise<Record<string, any> | null> {
    return await PatientModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteOne(id: string): Promise<Record<string, any> | null> {
    return await PatientModel.findByIdAndDelete(id).lean();
  }
}

const patientDao = new PatientDao();
export default patientDao;
