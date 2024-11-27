import express, { type Router } from "express";
import userRouter from "./user";
import videoRouter from "./video";
import audioRouter from "./audio";

const router: Router = express.Router();

router.use("/api", userRouter);
router.use("/api", videoRouter);
router.use("/api", audioRouter);

export default router;
