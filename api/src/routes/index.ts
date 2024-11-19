import express, { type Router } from "express";
import userRouter from "./user";
import videoRouter from "./video";

const router: Router = express.Router();

router.use("/api", userRouter);
router.use("/api", videoRouter);

export default router;
