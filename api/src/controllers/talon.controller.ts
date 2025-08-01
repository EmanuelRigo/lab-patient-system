import Controller from "./index.controller";
import talonService from "../services/talon.services";
import { Request, Response } from "express";
import { Talon } from "../../../types/talon.types";

class TalonController extends Controller<Talon> {
  constructor() {
    super(talonService);
  }

  createWithPayment = async (req: Request, res: Response) => {
    try {
      const talonDto = req.body.talon;
      const paymentDto = req.body.payment;

      const result = await talonService.createWithPayment(talonDto, paymentDto);
      res.json201(result, "Talon and payment created successfully");
    } catch (error) {
      res.json500("An error occurred while creating talon and payment");
    }
  };
}
const controller = new TalonController();
export default controller;
//   async createWithPayment(req: Request, res: Response) {
//     try {
//       const talonDto = req.body.talon;
//       const paymentDto = req.body.payment;

//       const result = await this.service.createWithPayment(talonDto, paymentDto);
//       res.status(201).json(result);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
