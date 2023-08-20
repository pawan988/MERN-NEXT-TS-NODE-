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

  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;
