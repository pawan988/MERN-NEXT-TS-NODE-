const expresss = require("express");
const router = expresss.Router();
import { verifyAuthentication } from "../middleware/authMiddleware";
import { validateCreateOrderFields } from "../middleware/orderMiddleware";

import { createNewOrder } from "../controllers/orderController";

router
  .route("/createOrder")
  .post(verifyAuthentication, validateCreateOrderFields, createNewOrder);

module.exports = router;
