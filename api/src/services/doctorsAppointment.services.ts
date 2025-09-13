import { DoctorAppointment } from "../../../types/doctorsAppointment.types";
// import dao from "../dao/factory";
// import { DoctorsAppointmentRepository } from "../repository/index.respository";
import DoctorsAppointmentRepository from "../repository/doctorAppointment.repository";

// const { doctorsAppointment } = dao;

class DoctorsAppointmentService {
  async getAll(): Promise<DoctorAppointment[] | null> {
    return await DoctorsAppointmentRepository.getAll();
  }

  async getById(id: string): Promise<DoctorAppointment | null> {
    const user = await DoctorsAppointmentRepository.getById(id);
    return user;
  }

  async getByName(username: string): Promise<DoctorAppointment | null> {
    const user = await DoctorsAppointmentRepository.getByName(username);
    return user;
  }

  async getByIdsWithPrice(ids: string[]): Promise<DoctorAppointment[]> {
    const appointments = await DoctorsAppointmentRepository.getByIdsWithPrice(
      ids
    );
    return appointments;
  }

  async create(data: DoctorAppointment): Promise<DoctorAppointment> {
    return await DoctorsAppointmentRepository.create(data);
  }

  async update(
    id: string,
    data: Partial<DoctorAppointment>
  ): Promise<DoctorAppointment | null> {
    return await DoctorsAppointmentRepository.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: DoctorAppointment;
  }> {
    const deletedDoctorsAppointment =
      await DoctorsAppointmentRepository.deleteOne(id);

    if (!deletedDoctorsAppointment) {
      throw new Error(
        "El estudio de laboratorio no fue encontrado o ya fue eliminado."
      );
    }

    return {
      success: true,
      message: "Estudio de laboratorio eliminado correctamente.",
      data: deletedDoctorsAppointment,
    };
  }
}

const doctorsAppointmentService = new DoctorsAppointmentService();

export default doctorsAppointmentService;
