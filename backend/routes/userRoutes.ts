const expresss = require("express");
const router = expresss.Router();

const { userRegiter } = require("../controllers/userController");
const { userLogin } = require("../controllers/userController");
import { userLogout } from "../controllers/userController";
import {
  validateUserFields,
  validateUserLoginFields,
} from "../middleware/usersMiddleware";

router.route("/userRegister").post(validateUserFields, userRegiter);
router.route("/userLogin").post(validateUserLoginFields, userLogin);
router.route("/userLogout").get(userLogout);

module.exports = router;
