import { Talon } from "../../../types/talon.types";
import { TalonRepository } from "../repository/index.respository";
import paymentService from "./payment.services";
import { Payment } from "../../../types/payment.types";

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
}

const talonService = new TalonService();
export default talonService;
