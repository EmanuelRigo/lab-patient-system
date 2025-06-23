// import labStaffRepository from "../dao/mongo/labStaff.dao";
import { LabStaff } from "../../../types/labStaff.types";
import dao from "../dao/factory";
import LabStaffDTO from "../dto/labStaff.dto";
import labStaffRepository from "../repository/labStaff.repository";

// const { labStaffRepository } = dao;

class LabStaffServices {
  async getAll(): Promise<LabStaff[]> {
    return await labStaffRepository.getAll();
  }

  async getByName(username: string): Promise<LabStaff | null> {
    const user = await labStaffRepository.getByName(username);
    return user;
  }

  async getById(id: string): Promise<LabStaff | null> {
    return await labStaffRepository.getById(id);
  }

  async getByUserName(username: string): Promise<LabStaff | null> {
    const user = await labStaffRepository.getByUserName(username);
    return user;
  }

  async create(data: LabStaff): Promise<LabStaff> {
    return await labStaffRepository.create(data);
  }

  async update(id: string, data: Partial<LabStaff>): Promise<LabStaff | null> {
    return await labStaffRepository.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: LabStaff;
  }> {
    return await labStaffRepository.deleteOne(id);
  }
}

const labStaffServices = new LabStaffServices();
export default labStaffServices;
