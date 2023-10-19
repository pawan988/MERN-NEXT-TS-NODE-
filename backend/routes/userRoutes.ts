const expresss = require("express");
const router = expresss.Router();

const { userRegiter } = require("../controllers/userController");
const { userLogin } = require("../controllers/userController");
import {
  validateUserFields,
  validateUserLoginFields,
} from "../middleware/usersMiddleware";

router.route("/userRegister").post(validateUserFields, userRegiter);
router.route("/userLogin").post(validateUserLoginFields, userLogin);

module.exports = router;
