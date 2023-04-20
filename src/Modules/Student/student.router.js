import *as student from "./controller/student.Controller.js"
import { adminMiddleware, auth } from "../../middleware/auth.middleware.js";
import { Router } from "express"
import { fileUploud, fileValidation } from "../../utiles/multer.cloudnery.js";
import { asyncErrorHandler } from "../../utiles/errorHandler.js";
import { Validation } from "../../middleware/validation.js";
import { updatePasswordSchema } from "./studentValidation.js";
let router = Router();

// router.patch("/", fileUploud(fileValidation.image).single("image"),
//  auth,
//  asyncErrorHandler(student.studentPic))

router.patch("/", auth, Validation(updatePasswordSchema),asyncErrorHandler(student.studentUpdatePassword))
router.patch("/delete", auth,asyncErrorHandler(student.StudentSoftDelete))
router.get("/", auth, adminMiddleware,asyncErrorHandler(student.getDeletedUsers))


export default router

