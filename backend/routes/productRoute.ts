import { validateProductFields } from "../middleware/addProductMiddleware";
import {
  verifyAuthentication,
  verifyRoles,
} from "../middleware/authMiddleware";
const expresss = require("express");
const router = expresss.Router();
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsDetail,
  addProductReview,
} from "../controllers/productController";

router.route("/productsList").get(verifyAuthentication, getAllProducts);
router
  .route("/addProduct")
  .post(
    verifyAuthentication,
    validateProductFields,
    verifyRoles("admin"),
    createProduct
  );
router
  .route("/updateProduct/:id")
  .put(verifyAuthentication, verifyRoles("admin"), updateProduct);
router
  .route("/deleteProduct/:id")
  .delete(verifyAuthentication, verifyRoles("admin"), deleteProduct);
router
  .route("/getProductDetail/:id")
  .get(verifyAuthentication, getProductsDetail);
router.route("/addProductReview").put(verifyAuthentication, addProductReview);

module.exports = router;
