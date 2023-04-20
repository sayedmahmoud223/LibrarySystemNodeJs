import { userModel } from "../../../../DB/dbModels/UserModel.js";
import cloudinary from "../../../utiles/cloudinery.js"
import { ResError } from "../../../utiles/errorHandler.js";
import bcrybt from "bcrypt"


// export let studentPic = async (req, res, next) => {
//     if (!req.file) {
//         return next(new ResError("file is requierd"))
//     }
//     // return res.json("jkxnsjk")
//     let { public_id, secure_url } = await cloudinary.uploader.upload(req.file.path, {floder:`upload/${req.user._id}/profile`})
//     console.log(cloud);
//     let user = await userModel.findOneAndUpdate({ _id: req.user.id }, { profilePic: pic}, {new:true})
//     return res.json({ message: "Done", secure_url })
// }



export let studentUpdatePassword = async (req, res, next) => {
    let { _id } = req.user;
    let { oldPassword, newPassword, confirmPassword } = req.body;
    let user = await userModel.findById(_id);

    let match = bcrybt.compareSync(oldPassword, user.password)
    console.log(match);
    if (!match) {
        return next(new ResError("old password is invalid", 400))
    }
    let hashnewPassword = bcrybt.hashSync(newPassword, 8);
    let updatePassword = await userModel.findByIdAndUpdate(_id, { password: hashnewPassword }, { new: true })

    return !updatePassword ? next(new ResError("not found to update")) : res.json({ message: "update", updatePassword })
}


export let StudentSoftDelete = async (req, res, next) => {
    let { _id } = req.user;
    let student = await userModel.findByIdAndUpdate(_id, { isDeleted: true }, {new:true})
    return !student ? next(new ResError("not found to delete")) : res.json({ message: "update", student })
}


export let getDeletedUsers = async (req, res, next) => {
    let students = await userModel.find( { isDeleted: true })
    return !students ? next(new ResError("not found")) : res.json({ message: "Deleted Students", students })
}



