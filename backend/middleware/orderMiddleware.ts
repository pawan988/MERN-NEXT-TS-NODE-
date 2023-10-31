interface OrderRequestBody {
  shippingInfo?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pinCode?: number;
    phonNo?: number;
  };
  paymentInfo?: {
    id: string;
    status: string;
  };
  orderItems?: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: string;
  }[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
import { Request, Response, NextFunction } from "express";
export function validateCreateOrderFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestBody: OrderRequestBody = req.body;
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = requestBody;
  const missingFields: string[] = [];

  if (!shippingInfo) missingFields.push("Shipping info");
  if (!shippingInfo?.address) missingFields.push("Address");
  if (!shippingInfo?.city) missingFields.push("City");
  if (!shippingInfo?.state) missingFields.push("State");
  if (!shippingInfo?.country) missingFields.push("Country");
  if (!shippingInfo?.pinCode) missingFields.push("Pin code");
  if (!shippingInfo?.phonNo) missingFields.push("Phone number");
  if (!paymentInfo) missingFields.push("Payment info");
  if (!orderItems) missingFields.push("Order items");
  if (!taxPrice) missingFields.push("Tax price");
  if (!shippingPrice) missingFields.push("Shipping price");
  if (!totalPrice) missingFields.push("Total Price");

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
