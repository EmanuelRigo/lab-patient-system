import labStaffServices from "../services/labStaff.services";
import { Request, Response } from "express";
import mongoose from "mongoose";

class LabStaffController {
  async getAll(req: Request, res: Response): Promise<void> {
    const response = await labStaffServices.getAll();
    const message = "labstaff read";
    res.json201(response, message);
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

  async create(req: Request, res: Response) {
    const message = "movie created";
    const data = req.body;

    const response = await labStaffServices.create(data);

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
  //     const response = await labStaffServices.update(mid, { formats, checked });

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

    const message = "movie deleted";
    const response = await labStaffServices.deleteOne(mid);
    if (response) {
      return res.json201(response, message);
    } else {
      return res.json404();
    }
  }
}

export const labStaffController = new LabStaffController();
