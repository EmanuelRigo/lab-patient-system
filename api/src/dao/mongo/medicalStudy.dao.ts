import MedicalStudyModel from "./model/medicalStudy.model";
import { MedicalStudy } from "../../../../types/medicalStudy.types";

class MedicalStudyDao {
  async getAll(): Promise<MedicalStudy[]> {
    return await MedicalStudyModel.find().lean();
  }

  async getByName(name: string): Promise<MedicalStudy | null> {
    return await MedicalStudyModel.findOne({ name }).lean();
  }

  async create(data: MedicalStudy): Promise<MedicalStudy> {
    return await MedicalStudyModel.create(data);
  }

  async update(
    id: string,
    data: Partial<MedicalStudy>
  ): Promise<MedicalStudy | null> {
    return await MedicalStudyModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  async deleteOne(id: string): Promise<MedicalStudy | null> {
    return await MedicalStudyModel.findByIdAndDelete(id).lean();
  }
}

const medicalStudyDAO = new MedicalStudyDao();
export default medicalStudyDAO;
