import multer from "multer";
export let fileValidation = {
    image: ["image/jpeg", "image/tif", "image/jpg", "image/png"],
    file: ["application/msword", "application/pdf"]
}

export function fileUploud( fileValidation = fileValidation.image) {

    const storage = multer.diskStorage({})
    // console.log(fileValidation.includes(file.mimetype));
    function fileFilter(req, file, cb) {
        if (fileValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb("invalid format", false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload
}