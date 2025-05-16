import { Request, Response, NextFunction } from "express";

function pathHandler(req: Request, res: Response, next: NextFunction) {
  const message = `${req.method} ${req.url} - ENDPOINT NOT FOUND`;
  const statusCode = 404;
  res.status(statusCode).json({ message });
  next();
}

export default pathHandler;
