import { Request, Response, NextFunction } from "express";
const Order = require("../models/orderModal");
const Product = require("../models/productModels");

// CREATE NEW ORDER

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//  GET SINGLE ORDER

export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(409).json({
        success: false,
        message: "Order not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order retrive successfully.",
      order,
    });
  } catch {
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};

// GET LOGGED IN USER ORDER

export const getMyOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
      return res.status(409).json({
        success: false,
        message: "Order not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order retrive successfully.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};

//  GET ALL ORDERS (--ADMIN)

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(409).json({
        success: true,
        message: "Order not found.",
      });
    }
    let totalAmount = 0;
    orders.forEach((items: any) => {
      totalAmount += items.totalPrice;
    });
    res.status(200).json({
      success: true,
      message: "Orders retrive successfully.",
      orders,
      totalAmount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE ORDER STATUS (--ADMIN)

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === "Deliverd") {
      return res.status(400).json({
        success: true,
        message: "You have alreay delivered this order",
      });
    }
    order.orderItems.forEach(async (items: any) => {
      await updateStock(items.product, items.quantity);
    });
    order.orderStatus = req.body.status;
    if (req.body.status === "Deliverd") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Order status pdated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

async function updateStock(id: string, quantity: number) {
  const product = await Product.findById(id);
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//  DELETE ORDER (--ADMIN)

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findOneAndDelete({ _id: orderId });
    if (!order) {
      return res.status(409).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal server error.",
    });
  }
};
