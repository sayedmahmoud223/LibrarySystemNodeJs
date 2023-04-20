import auth from "./Modules/auth/auth.router.js"
import student from "./Modules/student/student.router.js"
import book from "./Modules/Books/Book.router.js"
import { asyncGlobalErrorHandler } from "./utiles/errorHandler.js";
import path from "path"
import {fileURLToPath} from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export let initApp = (app, express) => {

    app.use("/uploads",express.static(path.join(__dirname, "./uploads")));
    app.use(express.json());
    app.use("/auth", auth);
    app.use("/student", student);
    app.use("/book", book);
    app.use(asyncGlobalErrorHandler);
    

}