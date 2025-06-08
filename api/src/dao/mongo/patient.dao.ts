import LabStaffModel from "./model/labStaff.model";
import { LabStaff } from "../../../../types/labStaff.types";

class LabStaffDao {
  async getAll(): Promise<LabStaff[]> {
    return await LabStaffModel.find().lean();
  }

  async getById(id: string): Promise<LabStaff | null> {
    return await LabStaffModel.findById(id).lean();
  }

  async getByIdAPI(id: string): Promise<LabStaff | null> {
    return await LabStaffModel.findOne({ id }).lean();
  }

  async create(data: LabStaff): Promise<LabStaff> {
    return await LabStaffModel.create(data);
  }

  async update(id: string, data: Partial<LabStaff>): Promise<LabStaff | null> {
    return await LabStaffModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  async deleteOne(id: string): Promise<LabStaff | null> {
    return await LabStaffModel.findByIdAndDelete(id).lean();
  }
}

const labStaffDao = new LabStaffDao();
export default labStaffDao;
