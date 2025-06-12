import labStaffDao from "../dao/mongo/labStaff.dao";
import { LabStaff } from "../../../types/labStaff.types";

class LabStaffServices {
  async getAll(): Promise<LabStaff[]> {
    return await labStaffDao.getAll();
  }

  async getById(id: string): Promise<LabStaff | null> {
    return await labStaffDao.getById(id);
  }

  async getByUserName(username: string): Promise<LabStaff | null> {
    const user = await labStaffDao.getByUserName(username);
    return user;
  }

  async create(data: LabStaff): Promise<LabStaff> {
    return await labStaffDao.create(data);
  }

  async update(id: string, data: Partial<LabStaff>): Promise<LabStaff | null> {
    return await labStaffDao.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: LabStaff;
  }> {
    const deletedLabStaff = await labStaffDao.deleteOne(id);

    if (!deletedLabStaff) {
      throw new Error(
        "El personal de laboratorio no fue encontrado o ya fue eliminado."
      );
    }

    return {
      success: true,
      message: "Personal de laboratorio eliminado correctamente.",
      data: deletedLabStaff,
    };
  }
}

const labStaffServices = new LabStaffServices();
export default labStaffServices;
