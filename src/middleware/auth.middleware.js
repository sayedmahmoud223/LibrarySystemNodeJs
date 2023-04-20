import jwt from "jsonwebtoken";
import { userModel } from "../../DB/dbModels/UserModel.js";
import { ResError } from "../utiles/errorHandler.js";


export let auth = async (req, res, next) => {
    let { token } = req.headers;
    if (!token) {
        return res.json({ message: "token is requierd" })
    }
    if (!token.startsWith(process.env.BEARER_KEY)) {
        return res.json({ message: "invalid token" })
    }
    let modifyToken = token.split(process.env.BEARER_KEY)[1];
    let decoded = jwt.verify(modifyToken, process.env.SIGNATURE)
    let authUser = await userModel.findById(decoded.id);
    if (!authUser || authUser.isDeleted == true) {
        return res.json({ message: "not register user" })
    }
    req.user = authUser;
    return next();

}
export let adminMiddleware = async (req, res, next) => {
    if(req.user.role != "admin"){
        return next(new ResError("not Admin user"))
    }
    return next();
}

