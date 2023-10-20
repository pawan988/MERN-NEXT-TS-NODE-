import { validateProductFields } from "../middleware/addProductMiddleware";
import { verifyAuthentication } from "../middleware/authMiddleware";
const expresss = require("express");
const router = expresss.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsDetail,
} = require("../controllers/productController");

router.route("/productsList").get(verifyAuthentication, getAllProducts);
router
  .route("/addProduct")
  .post(verifyAuthentication, validateProductFields, createProduct);
router.route("/updateProduct/:id").put(verifyAuthentication, updateProduct);
router.route("/deleteProduct/:id").delete(verifyAuthentication, deleteProduct);
router
  .route("/getProductDetail/:id")
  .get(verifyAuthentication, getProductsDetail);

module.exports = router;
