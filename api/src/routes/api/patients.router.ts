import { Router, Request, Response, NextFunction } from "express";
import patientDao from "../../dao/mongo/patient.dao";

const patientsApiRouter = Router();

patientsApiRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const response: any = await patientDao.create(data);
      const message = "PRODUCT CREATED";
      res.status(200).json({ response, message });
    } catch (error) {
      next(error);
    }
  }
);

patientsApiRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response: any[] = await patientDao.getAll();
      const message = "GET /api/patient";
      res.status(200).json({ response, message });
    } catch (error) {
      next(error);
    }
  }
);

export default patientsApiRouter;
