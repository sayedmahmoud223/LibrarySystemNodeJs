import { ResError } from "../utiles/errorHandler.js"

export let Validation = (Schema) => {
    return (req, res, next) => {
        let copReq = { ...req.body, ...req.query, ...req.params }
        let { error } = Schema.validate(copReq,{abortEarly: false })
        if (error?.details) {
            return next(new ResError(error.details.map(ele => ele.message) ))
            // res.json({ details: error.details.map(ele => ele.message) })
        }else{
            next()
        }
    }
}