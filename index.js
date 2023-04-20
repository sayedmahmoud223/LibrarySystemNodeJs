import { sendEmail } from './src/EmailComuncations/sendEmail.js';
import { dbConnection } from './DB/dbConnection.js';
import { initApp } from './src/app.router.js';

import dotenv from "dotenv";
dotenv.config();

import express from 'express';
const app = express();
const port = 5000;


initApp(app, express);
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))