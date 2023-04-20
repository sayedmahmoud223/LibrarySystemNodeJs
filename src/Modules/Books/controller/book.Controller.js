import { bookModel } from "../../../../DB/dbModels/BookModel.js";
import cloudinery from "../../../utiles/cloudinery.js";
import { ResError } from "../../../utiles/errorHandler.js";
import moment from "moment"


// endPoint for Admin only

export let addBookByAdmin = async (req, res, next) => {
    let { bookName } = req.body;
    let { _id } = req.user;
    let cloud = await cloudinery.uploader.upload(req.file.path, { folder: `book/${_id}/bookPic` })
    let { secure_url, public_id, folder } = cloud
    let addBook = await bookModel.create({ bookName, bookPic: { secure_url, public_id, folder }, adminId: _id })
    return res.status(201).json({ message: "added", addBook })
}


export let deleteBookByAdmin = async (req, res, next) => {
    let { bookId } = req.params;
    let deleteBook = await bookModel.findByIdAndDelete({ _id: bookId })
    console.log(deleteBook);
    await cloudinery.uploader.destroy(deleteBook.bookPic.public_id)
    return res.json({ message: "deleted", deleteBook })
}


export let updateBookByAdmin = async (req, res, next) => {
    let { _id } = req.user;
    let { Id } = req.params;
    let { bookName } = req.body;
    let { secure_url, public_id } = await cloudinery.uploader.upload(req.file.path, { folder: `book/${_id}/bookPic` })
    let updateBook = await bookModel.findByIdAndUpdate({ _id: Id }, { bookName, bookPic: { secure_url, public_id } })
    console.log(updateBook);
    await cloudinery.uploader.destroy(updateBook.bookPic.public_id)
    return res.json({ message: "updated", updateBook })
}

////////////////////////////


// for all users

export let findAllAvalibleBooks = async (req, res, next) => {
    let avalibleBooks = await bookModel.find({ bookStatus: "avalible" })
    return !avalibleBooks.length ? next(new ResError("Not Avalible Books", 400))
        : res.status(200).json({ message: "success", avalibleBooks })
}


export let findAllBorrowBooks = async (req, res, next) => {
    let avalibleBooks = await bookModel.find({ bookStatus: "borrow" }).populate({
        path: "studentId",
        select: "userName email"
    })
    return !avalibleBooks.length ? next(new ResError("Not borrow Books", 400))
        : res.status(200).json({ message: "success", avalibleBooks })
}


export let toBorrowBooks = async (req, res, next) => {
    let { bookId } = req.params;
    let { _id } = req.user;
    let { freeTime } = req.body;
    let book = await bookModel.findByIdAndUpdate({ _id: bookId },
        {
            bookStatus: "borrow", studentId: _id,
            borrowDate: moment().format("DD-MM-YYYY"),
            avalibleDate: moment(freeTime, "DD-MM-YYYY").toString()
        },
        { new: true })
    return !book ? next(new ResError("book Not found", 400))
        : res.status(200).json({ message: "success", book })
}


export let bookWillAvalible = async (req, res, next) => {
    let { bookId } = req.params;
    let DateNow = moment().toString()
    let book = await bookModel.findById({ _id: bookId })
    const moment1 = moment(DateNow).startOf("day");
    const moment2 = moment(book.avalibleDate).toString();
    const diffInDays = moment(moment2).diff(moment1, "days");
    if (diffInDays > 0) {
        book.totalCost = diffInDays*50;
        await book.save()
    }else{
        book.totalCost = 0;
        await book.save()
    }

    return !book ? next(new ResError("book Not found", 400))
        : res.status(200).json({ message: "success", book })
}