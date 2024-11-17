import express, { type Router, type Request, type Response, type NextFunction } from "express";
import userController from "../../controllers/user.controller";
import { validateResource } from "../../middleware/validateResource";
import { createUserSchema } from "../../schema/createUser.schema";

const router: Router = express.Router();

router.post("/users", validateResource(createUserSchema), userController.createUser);

export default router;
