import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
const errorHandler = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler && err.isOperational) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Error && err.name === "CastError") {
    const message = `Resource not found. Invalid: ${(err as any).path}`;
    err = new ErrorHandler(message, 400);
  }

  return res.status((err as any).statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
