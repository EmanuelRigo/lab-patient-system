import patientServices from "../services/patient.services";
import { Request, Response } from "express";
import mongoose from "mongoose";

class PatientController {
  async getAll(req: Request, res: Response) {
    const response = await patientServices.getAll();
    const message = "patients read";
    return res.json201(response, message);
  }

  async getById(req: Request, res: Response) {
    const mid = req.params.mid;
    const response = await patientServices.getById(mid);
    const message = "patient read";
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }

  async create(req: Request, res: Response) {
    const message = "pattient added";
    const data = req.body;

    const response = await patientServices.create(data);

    return res.json201(response, message);
  }

  //   async update(req: Request, res: Response) {
  //     const { mid } = req.params;
  //     const { formats, checked } = req.body;

  //     if (!formats) {
  //       const message = "Missing required fields";
  //       return res.json400(message);
  //     }

  //     if (!mongoose.Types.ObjectId.isValid(mid)) {
  //       return res.json404();
  //     }

  //     const message = "PRODUCT UPDATED";
  //     const response = await patientServices.update(mid, { formats, checked });

  //     if (response) {
  //       return res.json201(response, message);
  //     } else {
  //       return res.json404();
  //     }
  //   }

  async deleteOne(req: Request, res: Response) {
    const { mid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mid)) {
      return res.json404();
    }

    const message = "patient deleted";
    const response = await patientServices.deleteOne(mid);
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }
}

export const patientController = new PatientController();
