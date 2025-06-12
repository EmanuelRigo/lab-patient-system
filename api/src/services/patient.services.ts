import patientDAO from "../dao/mongo/patient.dao";
import { Patient } from "../../../types/patient.types";

class PatientServices {
  async getAll(): Promise<Patient[]> {
    return await patientDAO.getAll();
  }

  async getById(id: string): Promise<Patient | null> {
    return await patientDAO.getById(id);
  }

  async getByName(username: string): Promise<Patient | null> {
    const user = await patientDAO.getByName(username);
    return user;
  }

  async create(data: Patient): Promise<Patient> {
    return await patientDAO.create(data);
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient | null> {
    return await patientDAO.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: Patient;
  }> {
    const deletedPatient = await patientDAO.deleteOne(id);

    if (!deletedPatient) {
      throw new Error(
        "El personal de laboratorio no fue encontrado o ya fue eliminado."
      );
    }

    return {
      success: true,
      message: "Personal de laboratorio eliminado correctamente.",
      data: deletedPatient,
    };
  }
}

const patientServices = new PatientServices();
export default patientServices;
