import { Request, Response, NextFunction } from "express";
import ApiFeatures from "../utils/apiFeatures";
const Product = require("../models/productModels");

// CREATE PRODUCT (Only Admin Can Perfrom This Action)
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user.id;
    const { description, images, category, stock, rating, name, price } =
      req.body;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with the same name already exists.",
      });
    }
    const productData = new Product({
      name,
      description,
      images,
      category,
      stock,
      rating,
      price,
      user,
    });

    const product = await productData.save();

    return res.status(201).json({
      success: true,
      message: "Product has been successfully added.",
      product,
    });
  } catch (err) {
    console.log("errrr ===>>>", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET PRODUCT LISTS

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures: ApiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeatures?.query;

    if (!products || products.length === 0) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Products retrieved successfully.",
        products,
        productCount,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET PRODUCT DETAIL

export const getProductsDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "No product found.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product retrieved successfully.",
        product,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// UPDATE PRODUCT

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
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
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ADD OR UPDATE REVIEW

export const addProductReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.username,
      rating: Number(rating),
      comment,
    };
    console.log("reviewreviewreview ===>>>", review);
    const product = await Product.findById(productId);
    const isReviewd = product.reviews.find(
      (rev: any) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewd) {
      product.reviews.forEach((rev: any) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }
    let average = 0;
    product.rating =
      product.reviews.forEach((rev: any) => {
        average += rev.rating;
      }) / product.reviews.length;
    await product.save();
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("errr in catch block =====>>>>", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
