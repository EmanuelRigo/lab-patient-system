// import patientServices from "../services/patient.services";
// import { Request, Response } from "express";
// import mongoose from "mongoose";

// class PatientController {
//   async getAll(req: Request, res: Response): Promise<void> {
//     const response = await patientServices.getAll();
//     const message = "patients read";
//     res.json201(response, message);
//   }

//   async getById(req: Request, res: Response): Promise<void> {
//     const mid = req.params.mid;
//     const response = await patientServices.getById(mid);
//     const message = "patient read";
//     if (response) {
//       res.json201(response, message);
//     } else {
//       res.json404();
//     }
//   }

//   async create(req: Request, res: Response): Promise<void> {
//     const message = "pattient added";
//     const data = req.body;

//     const response = await patientServices.create(data);

//     res.json201(response, message);
//   }

//   async update(req: Request, res: Response): Promise<void> {
//     const { id } = req.params;
//     const { name, age } = req.body;

//     // Validación: nombre obligatorio
//     if (!name) {
//       res.json400("Missing required fields");
//       return; // 👈 corta la ejecución si falta un campo obligatorio
//     }

//     // Validación: ID debe ser un ObjectId válido de MongoDB
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res.json404();
//       return; // 👈 corta la ejecución si el ID no es válido
//     }

//     // Intentamos actualizar
//     const response = await patientServices.update(id, { name, age });

//     // Si se encuentra y actualiza
//     if (response) {
//       res.json201(response, "PATIENT UPDATED");
//     } else {
//       // Si no se encontró nada para actualizar
//       res.json404();
//     }
//   }

//   async deleteOne(req: Request, res: Response): Promise<void> {
//     const { mid } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(mid)) {
//       res.json404();
//     }

//     const message = "patient deleted";
//     const response = await patientServices.deleteOne(mid);
//     if (response) {
//       res.json201(response, message);
//     } else {
//       res.json404();
//     }
//   }
// }

// export const patientController = new PatientController();

import Controller from "./index.controller";
import patientServices from "../services/patient.services";

const controller = new Controller(patientServices);
export default controller;
