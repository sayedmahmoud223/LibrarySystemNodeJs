import joi from "joi";
import { validationkeys } from "../auth/authValidation.js";

export let updatePasswordSchema = joi.object({
    newPassword: validationkeys.password,
    confirmPassword: validationkeys.password.valid(joi.ref("newPassword")),
    oldPassword: validationkeys.password.invalid(joi.ref("newPassword"))
}).required()

