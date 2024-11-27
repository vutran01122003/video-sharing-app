import express, { type Router } from "express";
import userController from "../../controllers/user.controller";
import { validateResource } from "../../middleware/validateResource";
import { loginSchema, userSchema } from "../../schema/user.schema";
import { userIdSchema } from "../../schema";
import videoControllers from "../../controllers/video.controllers";
import { verifyToken } from "../../middleware/auth";

const router: Router = express.Router();

router.get("/users/verify-token", verifyToken, userController.getUserInfo);
router.post("/users/register", validateResource(userSchema), userController.createUser);
router.post("/users/login", validateResource(loginSchema), userController.loginUser);

router.get("/users/:user_id/videos", validateResource(userIdSchema), videoControllers.getAllVideoByUserId);

export default router;
