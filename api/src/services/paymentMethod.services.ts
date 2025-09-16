import { PaymentMethod } from "../../../types/paymentMethod.types";
import { PaymentMethodRepository } from "../repository/index.respository";

class PaymentMethodService {
  async getAll(): Promise<PaymentMethod[] | null> {
    return await PaymentMethodRepository.getAll();
  }

  async getById(id: string): Promise<PaymentMethod | null> {
    return await PaymentMethodRepository.getById(id);
  }

  async getByName(name: string): Promise<PaymentMethod | null> {
    return await PaymentMethodRepository.getByName(name);
  }

  async create(data: PaymentMethod): Promise<PaymentMethod> {
    return await PaymentMethodRepository.create(data);
  }

  async update(
    id: string,
    data: Partial<PaymentMethod>
  ): Promise<PaymentMethod | null> {
    return await PaymentMethodRepository.update(id, data);
  }

  async deleteOne(
    id: string
  ): Promise<{ success: boolean; message: string; data: PaymentMethod }> {
    const deletedPaymentMethod = await PaymentMethodRepository.deleteOne(id);

    if (!deletedPaymentMethod) {
      throw new Error(
        "El método de pago no fue encontrado o ya fue eliminado."
      );
    }

    return {
      success: true,
      message: "Método de pago eliminado correctamente.",
      data: deletedPaymentMethod,
    };
  }
}

const paymentMethodService = new PaymentMethodService();
export default paymentMethodService;
