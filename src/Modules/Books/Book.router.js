import * as book from "./controller/book.Controller.js"
import { Router } from "express"
import { adminMiddleware, auth } from "../../middleware/auth.middleware.js";
import { asyncErrorHandler } from "../../utiles/errorHandler.js";
import { fileUploud, fileValidation } from "../../utiles/multer.cloudnery.js";
import { Validation } from "../../middleware/validation.js";
import { toBorrowBooksSchema } from "./Book.validation.js";
let router = Router();

router.post("/", auth,fileUploud(fileValidation.image).single("image"),auth,adminMiddleware,asyncErrorHandler(book.addBookByAdmin))
router.delete("/:bookId",auth,adminMiddleware,asyncErrorHandler(book.deleteBookByAdmin))
router.put("/:Id", auth,fileUploud(fileValidation.image).single("image"),auth,adminMiddleware,asyncErrorHandler(book.updateBookByAdmin))
router.get("/",auth,asyncErrorHandler(book.findAllAvalibleBooks))
router.get("/borrow",auth,asyncErrorHandler(book.findAllBorrowBooks))
router.patch("/:bookId", auth,Validation(toBorrowBooksSchema),asyncErrorHandler(book.toBorrowBooks))
router.patch("/return/:bookId", auth,asyncErrorHandler(book.bookWillAvalible))


export default router
