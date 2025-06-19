// import LabStaffDao from "../dao/mongo/labStaff.dao";
import { LabStaff } from "../../../types/labStaff.types";
import dao from "../dao/factory";

const { LabStaffDao } = dao;

class LabStaffServices {
  async getAll(): Promise<LabStaff[]> {
    return await LabStaffDao.getAll();
  }

  async getById(id: string): Promise<LabStaff | null> {
    return await LabStaffDao.getById(id);
  }

  async getByUserName(username: string): Promise<LabStaff | null> {
    const user = await LabStaffDao.getByUserName(username);
    return user;
  }

  async create(data: LabStaff): Promise<LabStaff> {
    return await LabStaffDao.create(data);
  }

  async update(id: string, data: Partial<LabStaff>): Promise<LabStaff | null> {
    return await LabStaffDao.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: LabStaff;
  }> {
    const deletedLabStaff = await LabStaffDao.deleteOne(id);

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
