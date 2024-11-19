import express, { type Router } from "express";
import { validateResource } from "../../middleware/validateResource";
import { updateVideoSchema, uploadVideoSchema } from "../../schema/video.schema";
import videoControllers from "../../controllers/video.controllers";
import { videoIdSchema } from "../../schema";

const router: Router = express.Router();

router.post("/videos", validateResource(uploadVideoSchema), videoControllers.uploadVideo);
router.get("/videos/:video_id", validateResource(videoIdSchema), videoControllers.getVideoById);
router.patch("/videos/:video_id", validateResource(updateVideoSchema), videoControllers.updateVideoById);
router.delete("/videos/:video_id", validateResource(updateVideoSchema), videoControllers.deleteVideoById);

export default router;
