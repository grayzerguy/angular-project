import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import dal from "./04-dal/dal";
dal.connect();
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import productsRouter from "./06-controllers/products-controller";
import categoryRouter from "./06-controllers/categories-controller"
import usersRouter from "./06-controllers/users-controller"
import ordersRouter from "./06-controllers/orders-controller"
import path from "path";
import fs from 'fs'
import morgan from "morgan";
import preventGarbage from "./02-middleware/prevent-garbage";
import bodyParser from "body-parser";
import fileUpload  from "express-fileupload";


const server = express();
const api = process.env.API_URL
if (config.isDevelopment) server.use(cors()) && server.options("*",cors());//# if development mode then use corse
server.use(express.json());//#1 parse request body
// server.use("/public/uploads", express.static(__dirname + "/public/uploads"))
server.use(preventGarbage); // Call that middleware for any request.


//#log
server.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))//wright tp access.log file
server.use(morgan('tiny'))//show in console


// Routers
server.use(`${api}/products`, productsRouter);
server.use(`${api}/categories`, categoryRouter);
server.use(`${api}/users`, usersRouter);
server.use(`${api}/orders`, ordersRouter);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);//#errorsHandler
server.listen(process.env.PORT, () => console.log("Listening...", api));
