const expresss = require("express");
const router = expresss.Router();
import {
  verifyAuthentication,
  verifyRoles,
} from "../middleware/authMiddleware";
import { validateCreateOrderFields } from "../middleware/orderMiddleware";

import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getMyOrder,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderController";

router
  .route("/createOrder")
  .post(verifyAuthentication, validateCreateOrderFields, createNewOrder);
router.route("/getSingleOrder/:id").get(verifyAuthentication, getSingleOrder);
router.route("/getMyOrder").get(verifyAuthentication, getMyOrder);
router
  .route("/getAllOrders")
  .get(verifyAuthentication, verifyRoles("admin"), getAllOrders);
router
  .route("/updateOrder/:id")
  .put(verifyAuthentication, verifyRoles("admin"), updateOrder);
router
  .route("/deleteOrder/:id")
  .delete(verifyAuthentication, verifyRoles("admin"), deleteOrder);

module.exports = router;
