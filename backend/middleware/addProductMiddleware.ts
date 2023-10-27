interface ProductRequestBody {
  name?: string;
  description?: string;
  price?: number;
  ratings?: number;
  images?: { [key: string]: string };
  category?: string;
  stock?: number;
}

import { Request, Response, NextFunction } from "express";

export function validateProductFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestBody: ProductRequestBody = req.body;
  const { description, images, category, stock, ratings, name, price } =
    requestBody;
  const missingFields: string[] = [];

  if (!name) missingFields.push("name");
  if (!description) missingFields.push("description");
  if (!price) missingFields.push("price");
  if (!category) missingFields.push("category");
  if (!stock) missingFields.push("stock");
  if (!ratings) missingFields.push("rating");
  if (!images) missingFields.push("images");

  if (missingFields?.length > 0) {
    return res.status(400).json({
      success: false,
      message: `The following fields are missing or empty: ${missingFields.join(
        ", "
      )}`,
    });
  }

  next();
}
