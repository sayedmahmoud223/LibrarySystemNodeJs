import *as authController from "./controller/auth.Controller.js"
import { Validation } from "../../middleware/validation.js";
import { loginSchema, signupJoiSchema } from "./authValidation.js";
import { asyncErrorHandler } from "../../utiles/errorHandler.js";
import {Router} from "express"
let router = Router();

router.post("/signup", Validation(signupJoiSchema), asyncErrorHandler(authController.signup))
router.get("/confirmEmail/:token",  asyncErrorHandler(authController.confirmEmail))
router.get("/newConfirmEmail/:refreshToken",  asyncErrorHandler(authController.confirmNewEmail))
router.post("/login", Validation(loginSchema), asyncErrorHandler(authController.login))
router.post("/login/forget-password", asyncErrorHandler(authController.forgetPassword))
router.post("/login/reset-password/:id/:token", asyncErrorHandler(authController.resetPassword))
export default router