import { Schema, model } from "mongoose"

let userSchema = new Schema({
    userName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    confirmEmail: {
        type: Boolean,
        default: false,
        enum: [false, true]
    },
    isDeleted:{
        type:Boolean,
        default:false,
        enum:[true,false]
    },
    status:{
        type:String,
        default:"Active",
        enum:["Active","notActive"]
    },
    age: Number,
    profilePic: String,
    secure_url: String,
    public_id: String,

}, { timestamps: true })

export let userModel = model("User", userSchema);

// let adminUser = new userModel({
//     userName: "sayedMahmoud",
//     email: "sbendary@gmail.com",
//     age: 21,
//     role: "admin",
//     password: "12345678"
// })

// adminUser.save()
//     .then(user => console.log('Admin user created:', user))
//     .catch(err => console.error(err));