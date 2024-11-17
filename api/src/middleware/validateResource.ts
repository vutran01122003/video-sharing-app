import { Schema } from "zod";
import { type Request, type Response, type NextFunction, query } from "express";

export const validateResource = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        next();
    } catch (error) {
        next(error);
    }
};
