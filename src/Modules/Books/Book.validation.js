import joi from "joi";
// import joi from "@joi/date"


export let toBorrowBooksSchema = joi.object({
    bookId: joi.string().hex().length(24).required(),
    freeTime: joi.string().required()
}).required()

