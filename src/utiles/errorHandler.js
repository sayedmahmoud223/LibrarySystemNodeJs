export class ResError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
    }
}


export let asyncErrorHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return next(new ResError(err))
        })
    }
}


export let asyncGlobalErrorHandler = (err, req, res, next) => {
    if (err) {
        const statusCode = err.statusCode || 500;
        const message = err.message;
        return res.status(statusCode).json({ error: message, err });
    }
}



