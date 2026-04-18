import { Patient } from "../../../types/patient.types";
import PatientRepository from "../repository/patient.repository";

class PatientServices {
  async getAll(): Promise<Patient[] | null> {
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
      throw new Error("El paciente no fue encontrado o ya fue eliminado.");
    }

    return {
      success: true,
      message: "Paciente eliminado correctamente.",
      data: deletedPatient,
    };
  }

  async searchPatients(criteria: Record<string, any>): Promise<Patient[]> {
    return await PatientRepository.search(criteria);
  }

  // 🔥 NUEVO MÉTODO
  async getByNameLastName(text: string): Promise<Patient[]> {
    return await PatientRepository.getByNameLastName(text);
  }
}

const patientServices = new PatientServices();
export default patientServices;
