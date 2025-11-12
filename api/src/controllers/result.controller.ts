import Controller from "./index.controller";
import resultService from "../services/result.services";
import { Request, Response } from "express";
import { Result, ResultWithData } from "../../../types/result.types";

class ResultController extends Controller<Result & Partial<ResultWithData>> {
  constructor() {
    super(resultService);
  }

  // ✅ Nuevo método: obtener resultados por ID de paciente
  async getAllByPatientId(req: Request, res: Response, next: any) {
    try {
      const { id } = req.params; // suponemos que la ruta es /results/patient/:id

      if (!id) {
        return res
          .status(400)
          .json({ message: "❌ Missing patient ID in request parameters." });
      }

      const results = await resultService.getAllByPatientId(id);

      if (!results || results.length === 0) {
        return res
          .status(404)
          .json({ message: "⚠️ No results found for this patient." });
      }

      console.log(
        "🚀 ~ ResultController ~ getAllByPatientId ~ results:",
        results
      );
      return res.status(200).json(results);
    } catch (error) {
      console.error("❌ [ResultController] getAllByPatientId error:", error);
      next(error);
    }
  }
}

const controller = new ResultController();
export default controller;
