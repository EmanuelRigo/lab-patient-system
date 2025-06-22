import { DoctorsAppointment } from "../../../types/doctorsAppointment.types";
import dao from "../dao/factory";

const { doctorsAppointment } = dao;

class DoctorsAppointmentService {
  async getAll(): Promise<DoctorsAppointment[]> {
    return await doctorsAppointment.getAll();
  }

  async getByName(username: string): Promise<DoctorsAppointment | null> {
    const user = await doctorsAppointment.getByName(username);
    return user;
  }

  async create(data: DoctorsAppointment): Promise<DoctorsAppointment> {
    return await doctorsAppointment.create(data);
  }

  async update(
    id: string,
    data: Partial<DoctorsAppointment>
  ): Promise<DoctorsAppointment | null> {
    return await doctorsAppointment.update(id, data);
  }

  async deleteOne(id: string): Promise<{
    success: boolean;
    message: string;
    data: DoctorsAppointment;
  }> {
    const deletedDoctorsAppointment = await doctorsAppointment.deleteOne(id);

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
