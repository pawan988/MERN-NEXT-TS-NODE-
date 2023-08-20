const expresss = require("express");
const router = expresss.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsDetail,
} = require("../controllers/productController");

router.route("/productsList").get(getAllProducts);
router.route("/addProduct").post(createProduct);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/getProductDetail/:id").get(getProductsDetail);

module.exports = router;
