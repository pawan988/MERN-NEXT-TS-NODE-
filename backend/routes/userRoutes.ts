const expresss = require("express");
const router = expresss.Router();

import {
  userRegiter,
  changePassword,
  userLogin,
  userLogout,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  udpateUserRole,
  deleteUser,
} from "../controllers/userController";

import {
  validateUserFields,
  validateUserLoginFields,
} from "../middleware/usersMiddleware";
import {
  verifyAuthentication,
  verifyRoles,
} from "../middleware/authMiddleware";

router.route("/userRegister").post(validateUserFields, userRegiter);
router.route("/userLogin").post(validateUserLoginFields, userLogin);
router.route("/userLogout").get(userLogout);
router.route("/resetPassword").post(resetPassword);
router.route("/changePassword/:token").put(changePassword);
router.route("/getUserDetail").get(verifyAuthentication, getUserDetail);
router.route("/password/update").put(verifyAuthentication, updatePassword);
router.route("/profile/update").put(verifyAuthentication, updateProfile);
router
  .route("/admin/getAllUsers")
  .get(verifyAuthentication, verifyRoles("admin"), getAllUsers);
router
  .route("/admin/getSingleUser/:id")
  .get(verifyAuthentication, verifyRoles("admin"), getSingleUser);
router
  .route("/admin/updateUserRole/:id")
  .put(verifyAuthentication, verifyRoles("admin"), udpateUserRole);
router
  .route("/admin/deleteUser/:id")
  .delete(verifyAuthentication, verifyRoles("admin"), deleteUser);

module.exports = router;
