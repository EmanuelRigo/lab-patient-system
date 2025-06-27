import { Payment } from "../../../types/payment.types";
import { PaymentRepository } from "../repository/index.respository";

class PaymentService {
  async getAll(): Promise<Payment[]> {
    return await PaymentRepository.getAll();
  }

  async getById(id: string): Promise<Payment | null> {
    return await PaymentRepository.getById(id);
  }

  async create(data: Payment): Promise<Payment> {
    return await PaymentRepository.create(data);
  }

  async update(id: string, data: Partial<Payment>): Promise<Payment | null> {
    return await PaymentRepository.update(id, data);
  }

  async deleteOne(
    id: string
  ): Promise<{ success: boolean; message: string; data: Payment }> {
    const deletedPayment = await PaymentRepository.deleteOne(id);

    if (!deletedPayment) {
      throw new Error("El pago no fue encontrado o ya fue eliminado.");
    }

    return {
      success: true,
      message: "Pago eliminado correctamente.",
      data: deletedPayment,
    };
  }
}

const paymentService = new PaymentService();
export default paymentService;
