import doctorsAppointmentService from "../services/doctorsAppointment.services";
import { Request, Response } from "express";
import mongoose from "mongoose";

class DoctorsAppointmentController {
  async getAll(req: Request, res: Response): Promise<void> {
    const response = await doctorsAppointmentService.getAll();
    const message = "labstaff read";
    res.json201(response, message);
  }

  async getByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    const response = await doctorsAppointmentService.getByName(name);
    const message = "doctor's appointment read";
    if (response) {
      res.json201(response, message);
    } else {
      res.json404();
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const message = "doctor's appointment created";
    const data = req.body;
    const response = await doctorsAppointmentService.create(data);
    res.json201(response, message);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { date, reason } = req.body;

    // Validación: fecha y motivo son obligatorios
    if (!date || !reason) {
      res.json400("Missing required fields");
      return; // 👈 corta la ejecución si falta un campo obligatorio
    }

    // Validación: ID debe ser un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json404();
      return; // 👈 corta la ejecución si el ID no es válido
    }

    // Intentamos actualizar
    const response = await doctorsAppointmentService.update(id, {
      date,
      reason,
    });

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
    const response = await doctorsAppointmentService.deleteOne(id);
    if (response) {
      res.json201(response, message);
    } else {
      res.json404();
    }
  }
}

export const doctorsAppointmentController = new DoctorsAppointmentController();
