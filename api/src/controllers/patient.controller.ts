import Controller from "./index.controller";
import patientServices from "../services/patient.services";
import { Request, Response } from "express";
import { Patient } from "../../../types/patient.types";

class PatientController extends Controller<Patient> {
  constructor() {
    super(patientServices);
  }

  search = async (req: Request, res: Response) => {
    const { dni, firstname, lastname } = req.query;

    const criteria: any = {};

    if (dni) criteria.dni = { $regex: dni, $options: "i" };
    if (firstname) criteria.firstname = { $regex: firstname, $options: "i" };
    if (lastname) criteria.lastname = { $regex: lastname, $options: "i" };

    // Validación simple: si no se pasó ningún criterio
    if (Object.keys(criteria).length === 0) {
      return res.json400("You must provide at least one search parameter.");
    }

    const results = await patientServices.searchPatients(criteria);
    res.json201(results, "patients found");
  };
}

const controller = new PatientController();
export default controller;
