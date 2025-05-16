import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(error);
  const message = `${req.method} ${req.url} - ${error.message || "API ERROR"}`;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message });
}

export default errorHandler;
