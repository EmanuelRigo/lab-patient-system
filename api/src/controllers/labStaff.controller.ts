import labStaffServices from "../services/labStaff.services";
import { Request, Response } from "express";
import mongoose from "mongoose";

class LabStaffController {
  async getAll(req: Request, res: Response): Promise<void> {
    const response = await labStaffServices.getAll();
    const message = "labstaff read";
    res.json201(response, message);
  }

  async getByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const response = await labStaffServices.getByName(name);
    const message = "lab staff read";
    if (response) {
      res.json201(response, message);
    } else {
      res.json404();
    }
  }

  async getById(req: Request, res: Response) {
    const mid = req.params.mid;
    const response = await labStaffServices.getById(mid);
    const message = "movie read";
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const message = "movie created";
    const data = req.body;
    const response = await labStaffServices.create(data);
    res.json201(response, message);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;

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
    const response = await labStaffServices.update(id, { name });

    // Si se encuentra y actualiza
    if (response) {
      res.json201(response, "LAB STAFF UPDATED");
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

    const message = "LAB STAFF DELETED";
    const response = await labStaffServices.deleteOne(id);
    if (response) {
      res.json201(response, message);
    } else {
      res.json404();
    }
  }
}

export const labStaffController = new LabStaffController();
