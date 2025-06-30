// import labStaffRepository from "../dao/mongo/labStaff.dao";
import { LabStaff } from "../../../types/labStaff.types";
// import dao from "../dao/factory";
// import LabStaffDTO from "../dto/labStaff.dto";
// import labStaffRepository from "../repository/labStaff.repository";
import { LabStaffRepository } from "../repository/index.respository";
console.log("🚀 ~ LabStaffRepository:", LabStaffRepository);

// const { labStaffRepository } = dao;

class LabStaffServices {
  async getAll(): Promise<LabStaff[]> {
    return await LabStaffRepository.getAll();
  }

  async getByName(username: string): Promise<LabStaff | null> {
    const user = await LabStaffRepository.getByName(username);
    return user;
  }

  async getById(id: string): Promise<LabStaff | null> {
    return await LabStaffRepository.getById(id);
  }

  // async getByUserName(username: string): Promise<LabStaff | null> {
  //   const user = await LabStaffRepository.getByUserName(username);
  //   return user;
  // }

  async create(data: LabStaff): Promise<LabStaff> {
    return await LabStaffRepository.create(data);
  }

  async update(id: string, data: Partial<LabStaff>): Promise<LabStaff | null> {
    return await LabStaffRepository.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: LabStaff;
  }> {
    const data = await LabStaffRepository.deleteOne(id);
    return {
      success: true,
      message: "Personal de laboratorio eliminado correctamente.",
      data: data,
    };
  }
}

const labStaffServices = new LabStaffServices();
export default labStaffServices;
