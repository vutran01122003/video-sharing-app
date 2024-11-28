import dotenv from "dotenv";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import router from "./routes";

import database from "./dbs/database.connection";
import { ZodError } from "zod";
dotenv.config();

const app: Express = express();

database.getInstance();

const PORT = process.env.APP_PORT;

app.use(
    cors({
        origin: "*"
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        status: 400,
        msg: "Route don't exist"
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Error occur in server";

    if (err instanceof ZodError) {
        res.status(status).json({
            status: 400,
            name: err.name,
            message: err.issues[0].message
        });
    } else
        res.status(status).json({
            status,
            message
        });
});

app.listen(PORT, () => {
    console.log("App is running at port:::", PORT);
});
