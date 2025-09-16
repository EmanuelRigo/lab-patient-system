import { Talon } from "../../../types/talon.types";
import { TalonRepository } from "../repository/index.respository";
import paymentService from "./payment.services";
import { Payment } from "../../../types/payment.types";
import doctorsAppointmentService from "./doctorsAppointment.services";
import { DoctorAppointment } from "../../../types/doctorsAppointment.types";

class TalonService {
  async getAll(): Promise<Talon[] | null> {
    return await TalonRepository.getAll();
  }

  async getById(id: string): Promise<Talon | null> {
    return await TalonRepository.getById(id);
  }

  async create(data: Talon): Promise<Talon> {
    return await TalonRepository.create(data);
  }

  async update(id: string, data: Partial<Talon>): Promise<Talon | null> {
    return await TalonRepository.update(id, data);
  }

  async deleteOne(
    id: string
  ): Promise<{ success: boolean; message: string; data: Talon }> {
    const deletedResult = await TalonRepository.deleteOne(id);

    if (!deletedResult) {
      throw new Error("El resultado no fue encontrado o ya fue eliminado.");
    }

    return {
      success: true,
      message: "Resultado eliminado correctamente.",
      data: deletedResult,
    };
  }

  async createWithPayment(
    talonData: Talon,
    paymentData: Payment
  ): Promise<{ talon: Talon; payment: Payment }> {
    const talon = await TalonRepository.create(talonData);
    const payment = await paymentService.create({
      ...paymentData,
      talonId: talon._id,
    });

    return { talon, payment };
  }

  async updateWithAppointments(
    id: string,
    appointmentIds: string[]
  ): Promise<Talon | null> {
    // 1. Traemos los appointments con su precio
    const appointments = await doctorsAppointmentService.getByIdsWithPrice(
      appointmentIds
    );
    console.log(
      "🚀 ~ TalonService ~ updateWithAppointments ~ appointments:",
      appointments
    );

    // 2. Calculamos el total (o lo que necesites)
    const totalPrice = appointments.reduce(
      (acc, appt) => acc + (appt.medicalStudy.price || 0),
      0
    );

    // 3. Actualizamos el talon con ese precio
    const updatedTalon = await TalonRepository.update(id, {
      totalAmount: totalPrice,
    });

    return updatedTalon;
  }
}

const talonService = new TalonService();
export default talonService;
