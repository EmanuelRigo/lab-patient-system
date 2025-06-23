import medicalStudyDAO from "../dao/mongo/medicalStudy.dao";

import { MedicalStudy } from "../../../types/medicalStudy.types";

class MedicalStudiesServices {
  async getAll(): Promise<MedicalStudy[]> {
    return await medicalStudyDAO.getAll();
  }

  async getByName(username: string): Promise<MedicalStudy | null> {
    const user = await medicalStudyDAO.getByName(username);
    return user;
  }

  async create(data: MedicalStudy): Promise<MedicalStudy> {
    return await medicalStudyDAO.create(data);
  }

  async update(
    id: string,
    data: Partial<MedicalStudy>
  ): Promise<MedicalStudy | null> {
    return await medicalStudyDAO.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: MedicalStudy;
  }> {
    const deletedMedicalStudy = await medicalStudyDAO.deleteOne(id);

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
