import Controller from "./index.controller";
import patientServices from "../services/patient.services";
import { Request, Response } from "express";
import { Patient } from "../../../types/patient.types";

class PatientController extends Controller<Patient> {
  constructor() {
    super(patientServices);
  }

  // 🔍 Nueva búsqueda unificada
  getByNameLastName = async (req: Request, res: Response) => {
    const { text } = req.query;

    if (!text || typeof text !== "string") {
      return res.json400("You must provide the parameter 'text'.");
    }

    const results = await patientServices.getByNameLastName(text);

    return res.json200(results, "patients found");
  };
}

const controller = new PatientController();
export default controller;
