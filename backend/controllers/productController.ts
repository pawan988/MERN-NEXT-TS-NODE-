import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import asyncMiddleware from "../middleware/catchAsyncError";
const Product = require("../models/productModels");

// CREATE PRODUCT (Only Admin Can Perfrom This Action)
export const createProduct = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product has been successfully added.",
      product,
    });
  }
);

// GET PRODUCT LISTS
export const getAllProducts = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      products,
    });
  }
);

// GET PRODUCT DETAIL

export const getProductsDetail = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const products = await Product.findById(productId);

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      products,
    });
  }
);

// UPDATE PRODUCT

export const updateProduct = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  }
);

// DELETE PRODUCT
export const deleteProduct = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  }
);
