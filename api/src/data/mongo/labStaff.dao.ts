import LabStaffModel from "./model/labStaff.model";

class LabStaffDao {
  async getAll(): Promise<Record<string, any>[]> {
    return await LabStaffModel.find().lean();
  }

  async getById(id: string): Promise<Record<string, any> | null> {
    return await LabStaffModel.findById(id).lean();
  }

  async getByIdAPI(id: string): Promise<Record<string, any> | null> {
    return await LabStaffModel.findOne({ id }).lean();
  }

  async create(data: Record<string, any>): Promise<Record<string, any>> {
    return await LabStaffModel.create(data);
  }

  async update(
    id: string,
    data: Record<string, any>
  ): Promise<Record<string, any> | null> {
    return await LabStaffModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  async deleteOne(id: string): Promise<Record<string, any> | null> {
    return await LabStaffModel.findByIdAndDelete(id).lean();
  }
}

const patientDao = new LabStaffDao();
export default patientDao;
