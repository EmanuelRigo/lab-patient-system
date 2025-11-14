import { DoctorAppointment } from "../../../../types/doctorsAppointment.types";
import DoctorsAppointmentModel from "./model/doctorsAppointment.model";

class DoctorsAppointmentDao {
  async getAll(): Promise<DoctorAppointment[]> {
    return await DoctorsAppointmentModel.find().lean();
  }

  async getByName(username: string): Promise<DoctorAppointment | null> {
    return await DoctorsAppointmentModel.findOne({ username }).lean();
  }

  async getById(id: string): Promise<DoctorAppointment | null> {
    return await DoctorsAppointmentModel.findById(id).lean();
  }

  async create(data: Partial<DoctorAppointment>): Promise<DoctorAppointment> {
    return await DoctorsAppointmentModel.create(data);
  }

  async update(
    id: string,
    data: Partial<DoctorAppointment>
  ): Promise<DoctorAppointment | null> {
    return await DoctorsAppointmentModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  async deleteOne(id: string): Promise<DoctorAppointment | null> {
    return await DoctorsAppointmentModel.findByIdAndDelete(id).lean();
  }
}

const doctorsAppointmentDao = new DoctorsAppointmentDao();
export default doctorsAppointmentDao;
