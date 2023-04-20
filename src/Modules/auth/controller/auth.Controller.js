import { userModel } from "../../../../DB/dbModels/UserModel.js";
import { sendEmail } from "../../../EmailComuncations/sendEmail.js";
import { ResError } from "../../../utiles/errorHandler.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export let signup = async (req, res, next) => {
    let { userName, email, password, confirmPassword, age } = req.body;
    let checkUser = await userModel.findOne({ email });
    if (checkUser) {
        return next(new ResError("email is exist", 401))
    }
    let hashPassword = bcrypt.hashSync(password, 8);
    let token = jwt.sign({ email }, process.env.SIGNATURE, { expiresIn: 60 * 5 });
    let link = `http://localhost:5000/auth/confirmEmail/${token}`;

    let refreshToken = jwt.sign({ email }, process.env.SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 * 12 });
    let refreshlink = `http://localhost:5000/auth/newConfirmEmail/${refreshToken}`;

    let html = `<a href="${link}">Click me to confirm your email now</a>
                <br>
                <br>
                <a href="${refreshlink}">Click me to new confirm email</a>`;
    let info = await sendEmail({ to: email, html });
    if (!info) {
        return next(new ResError("Rejected Email", 400))
    }
    let user = await userModel.create({ userName, email, password: hashPassword, confirmPassword, age });
    return res.status(201).json({ message: "Done", user })
}


export let confirmEmail = async (req, res, next) => {
    let { token } = req.params;
    let decoded = jwt.verify(token, process.env.SIGNATURE);
    let updateConfirmEmailUser = await userModel.findOneAndUpdate({ email: decoded.email }, { confirmEmail: true })
    return updateConfirmEmailUser ? res.status(200).redirect("https://www.youtube.com/") : next(new Error("NOT Regiser Account"))
}


export let confirmNewEmail = async (req, res, next) => {

    let { refreshToken } = req.params;
    let { email } = jwt.verify(refreshToken, process.env.SIGNATURE);
    let newtoken = jwt.sign({ email }, process.env.SIGNATURE, { expiresIn: 60 * 1 });
    let link = `http://localhost:5000/auth/confirmEmail/${newtoken}`;

    let refreshlink = `http://localhost:5000/auth/newConfirmEmail/${refreshToken}`;

    let html = `<a href="${link}">Click me to confirm your email now</a>
                <br>
                <br>
                <a href="${refreshlink}">Click me to new confirm email</a>`;
    let info = await sendEmail({ to: email, html });
    if (!info) {
        return next(new ResError("Rejected Email", 400))
    }
    return res.status(200).send("Done Check your email")
}


export let login = async (req, res, next) => {

    let { email, password } = req.body;
    let user = await userModel.findOne({ email })
    if (!user || !user.confirmEmail) {
        return next(new ResError("invalid email", 401))
    }
    let comparePass = bcrypt.compareSync(password, user.password)
    if (!comparePass) {
        return next(new ResError("invalid password", 401))
    }
    let token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.SIGNATURE, { expiresIn: 60 * 60 * 24 })
    return res.status(200).json({ message: "Done", token })
}


export let forgetPassword = async (req, res, next) => {

    let { email } = req.body;
    // console.log({email});
    let user = await userModel.findOne({ email })
    if (!user) {
        return next(new ResError("user not found", 404))
    }
    let secret = process.env.SIGNATURE + user.password
    let token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: 60 * 10 });
    let id = user._id
    let link = `http://localhost:5000/auth/login/reset-password/${id}/${token}`;
    let html = `<a href="${link}">Click Here To Reset Your Password </a>`
    let forgetPasswordEmail = await sendEmail({ to: user.email, html });
    if (!forgetPasswordEmail) {
        return next(new ResError("Rejected email", 400))
    }
}


export let resetPassword = async (req, res, next) => {
    let { password } = req.body;
    let { id, token } = req.params;
    let user = await userModel.findById({ _id: id })
    if (!user) {
        return next(new ResError("user not found", 404))
    }
    let secret = process.env.SIGNATURE + user.password
    let decoded = jwt.verify(token, secret);
    let hashPassword = bcrypt.hashSync(password, 8)
    let getUserAndUpdate = await userModel.findByIdAndUpdate({ _id: decoded.id }, { password: hashPassword })
    return res.status(200).json({ message: "done", getUserAndUpdate })
}



// export let unSupscripe = async (req, res, next) => {

//     let { refreshToken } = req.params;
//     let { email } = jwt.verify(refreshToken, process.env.SIGNATURE);
//     await userModel.findOneAndDelete(email);
//     return res.status(200).redirect("https://www.youtube.com/watch?v=s_C0CDkP3Cc&list=RDMMs_C0CDkP3Cc&start_radio=1")
// }