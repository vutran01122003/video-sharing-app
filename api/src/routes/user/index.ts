import express, { type Router, type Request, type Response, type NextFunction } from "express";
import userController from "../../controllers/user.controller";
import { validateResource } from "../../middleware/validateResource";
import { createUserSchema } from "../../schema/createUser.schema";
import { loginUserSchema } from "../../schema/loginUser.schema";
import { userIdSchema } from "../../schema";
import videoControllers from "../../controllers/video.controllers";

const router: Router = express.Router();

router.post("/users/register", validateResource(createUserSchema), userController.createUser);
router.post("/users/login", validateResource(loginUserSchema), userController.loginUser);

router.get("/users/:user_id/videos", validateResource(userIdSchema), videoControllers.getAllVideoByUserId);

export default router;
