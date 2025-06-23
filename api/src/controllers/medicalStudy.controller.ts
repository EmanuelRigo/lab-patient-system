import medicalStudyServices from "../services/medicalStudy.services";
import { Request, Response } from "express";
import mongoose from "mongoose";

class MedicalStudiesController {
  async getAll(req: Request, res: Response): Promise<void> {
    const response = await medicalStudyServices.getAll();
    const message = "patients read";
    res.json201(response, message);
  }

  async getByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const response = await medicalStudyServices.getByName(name);
    const message = "medical study read";
    if (response) {
      res.json201(response, message);
    } else {
      res.json404();
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const message = "pattient added";
    const data = req.body;

    const response = await medicalStudyServices.create(data);

    res.json201(response, message);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, price } = req.body;

    // Validación: nombre obligatorio
    if (!name) {
      res.json400("Missing required fields");
      return; // 👈 corta la ejecución si falta un campo obligatorio
    }

    // Validación: ID debe ser un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json404();
      return; // 👈 corta la ejecución si el ID no es válido
    }

    // Intentamos actualizar
    const response = await medicalStudyServices.update(id, { name, price });

    // Si se encuentra y actualiza
    if (response) {
      res.json201(response, "PATIENT UPDATED");
    } else {
      // Si no se encontró nada para actualizar
      res.json404();
    }
  }

  async deleteOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json404();
    }

    const message = "patient deleted";
    const response = await medicalStudyServices.deleteOne(id);
    if (response) {
      res.json201(response, message);
    } else {
      res.json404();
    }
  }
}

export const medicalStudyController = new MedicalStudiesController();
