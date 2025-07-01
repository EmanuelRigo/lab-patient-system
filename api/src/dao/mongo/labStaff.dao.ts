import LabStaffModel from "./model/labStaff.model";
import { LabStaff } from "../../../../types/labStaff.types";

class LabStaffDao {
  async getAll(): Promise<LabStaff[]> {
    return await LabStaffModel.find().lean();
  }

  async getByName(name: string): Promise<LabStaff | null> {
    const user = await LabStaffModel.findOne({ name }).lean();
    return user;
  }

  async getById(id: string): Promise<LabStaff | null> {
    return await LabStaffModel.findById(id).lean();
  }

  async getByUsername(username: string): Promise<LabStaff | null> {
    return await LabStaffModel.findOne({ username }).lean();
  }

  async getByIdAPI(id: string): Promise<LabStaff | null> {
    return await LabStaffModel.findOne({ id }).lean();
  }

  async create(data: Partial<LabStaff>): Promise<LabStaff> {
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
