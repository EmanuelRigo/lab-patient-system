import { Patient } from "../../../types/patient.types";

import { PatientRepository } from "../repository/index.respository";

class PatientServices {
  async getAll(): Promise<Patient[]> {
    return await PatientRepository.getAll();
  }

  async getById(id: string): Promise<Patient | null> {
    return await PatientRepository.getById(id);
  }

  async getByName(username: string): Promise<Patient | null> {
    const user = await PatientRepository.getByName(username);
    return user;
  }

  async create(data: Patient): Promise<Patient> {
    return await PatientRepository.create(data);
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient | null> {
    return await PatientRepository.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: Patient;
  }> {
    const deletedPatient = await PatientRepository.deleteOne(id);

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
