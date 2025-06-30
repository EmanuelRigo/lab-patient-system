import { MedicalStudy } from "../../../types/medicalStudy.types";
// import dao from "../dao/factory";
import { MedicalStudyRepository } from "../repository/index.respository";

// const { MedicalStudyRepository } = dao;

class MedicalStudiesServices {
  async getAll(): Promise<MedicalStudy[]> {
    return await MedicalStudyRepository.getAll();
  }

  async getByName(username: string): Promise<MedicalStudy | null> {
    const user = await MedicalStudyRepository.getByName(username);
    return user;
  }

  async create(data: MedicalStudy): Promise<MedicalStudy> {
    return await MedicalStudyRepository.create(data);
  }

  async update(
    id: string,
    data: Partial<MedicalStudy>
  ): Promise<MedicalStudy | null> {
    return await MedicalStudyRepository.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: MedicalStudy;
  }> {
    const deletedMedicalStudy = await MedicalStudyRepository.deleteOne(id);

    if (!deletedMedicalStudy) {
      throw new Error(
        "El estudio de laboratorio no fue encontrado o ya fue eliminado."
      );
    }

    return {
      success: true,
      message: "Estudio de laboratorio eliminado correctamente.",
      data: deletedMedicalStudy,
    };
  }
}

const medicalStudyServices = new MedicalStudiesServices();
export default medicalStudyServices;
