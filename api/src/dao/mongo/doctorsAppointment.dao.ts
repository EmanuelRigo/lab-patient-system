import { DoctorsAppointment } from "../../../../types/doctorsAppointment.types";
import DoctorsAppointmentModel from "./model/doctorsAppointment.model";

class DoctorsAppointmentDao {
  async getAll(): Promise<DoctorsAppointment[]> {
    return await DoctorsAppointmentModel.find().lean();
  }

  async getByName(username: string): Promise<DoctorsAppointment | null> {
    return await DoctorsAppointmentModel.findOne({ username }).lean();
  }

  async getById(id: string): Promise<DoctorsAppointment | null> {
    return await DoctorsAppointmentModel.findById(id).lean();
  }

  async create(data: Partial<DoctorsAppointment>): Promise<DoctorsAppointment> {
    return await DoctorsAppointmentModel.create(data);
  }

  async update(
    id: string,
    data: Partial<DoctorsAppointment>
  ): Promise<DoctorsAppointment | null> {
    return await DoctorsAppointmentModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
  }

  async deleteOne(id: string): Promise<DoctorsAppointment | null> {
    return await DoctorsAppointmentModel.findByIdAndDelete(id).lean();
  }
}

const doctorsAppointmentDao = new DoctorsAppointmentDao();
export default doctorsAppointmentDao;
