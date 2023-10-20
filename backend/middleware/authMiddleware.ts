import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
declare module "express" {
  export interface Request {
    user: any;
  }
}
export const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token as string | undefined;
  if (!token) {
    res.status(401).json({
      message: "Please login to accesss this resource.",
    });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData?.id);

  next();
};
