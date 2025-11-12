import { Result, ResultWithData } from "../../../types/result.types";

// import { ResultRepository } from "../repository/index.respository";
import ResultRepository from "../repository/result.repository";

class ResultService {
  async getAllByPatientId(id: string): Promise<ResultWithData[] | null> {
    return await ResultRepository.getAllByPatientId(id);
  }

  async getAll(): Promise<Result[] | null> {
    return await ResultRepository.getAll();
  }

  async getById(id: string): Promise<Result | null> {
    return await ResultRepository.getById(id);
  }

  async create(data: Result): Promise<Result> {
    return await ResultRepository.create(data);
  }

  async update(id: string, data: Partial<Result>): Promise<Result | null> {
    return await ResultRepository.update(id, data);
  }

  async deleteOne(
    id: string
  ): Promise<{ success: boolean; message: string; data: Result }> {
    const deletedResult = await ResultRepository.deleteOne(id);

    if (!deletedResult) {
      throw new Error("El resultado no fue encontrado o ya fue eliminado.");
    }

    return {
      success: true,
      message: "Resultado eliminado correctamente.",
      data: deletedResult,
    };
  }
}

const resultService = new ResultService();
export default resultService;
