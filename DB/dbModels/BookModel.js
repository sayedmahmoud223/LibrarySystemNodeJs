import { Schema, model, Types } from "mongoose"

let bookSchema = new Schema({
    bookName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        unique: true,
        required: true
    },
    adminId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    studentId: {
        type: Types.ObjectId,
        ref: "User",
    },
    borrowDate: {
        type: String
    },
    avalibleDate: {
        type: String
    },
    bookStatus: {
        type: String,
        default: "avalible",
        enum: ["avalible", "borrow"]
    },
    isDeleted: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    bookPic: {
        type: Object,
        required: true
    },
    
    totalCost: {
        type: Number,
    },
    

}, { timestamps: true })

export let bookModel = model("Book", bookSchema);
