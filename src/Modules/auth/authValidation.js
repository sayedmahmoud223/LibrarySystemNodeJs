import joi from "joi"

export let validationkeys = {
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: ["com", "net", "org", "gov"] }).required(),
    password: joi.string().min(8).max(50).required(),
}

export let signupJoiSchema = joi.object({
    userName:joi.string().min(3).max(50).required(),
    email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 3, tlds: ["com", "net", "org", "gov"] }).required(),    password: validationkeys.password,
    confirmPassword: joi.string().valid(joi.ref("password")).min(3).max(100).required(),
    age:joi.number().min(18).max(80),
    role:joi.string().valid("admin","user"),
}).required()

export let loginSchema = joi.object({
    email: validationkeys.email,
    password: validationkeys.password,
}).required()
