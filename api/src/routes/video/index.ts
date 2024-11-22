import express, { type Router } from "express";
import videoControllers from "../../controllers/video.controllers";
import { validateResource } from "../../middleware/validateResource";
import { videoIdSchema } from "../../schema";
import { updateVideoSchema, uploadVideoSchema } from "../../schema/video.schema";
import { commentIdListSchema, commentSchema, updateCommentSchema } from "../../schema/comment.schema";
import { verifyToken } from "../../middleware/auth";

const router: Router = express.Router();

router.post("/videos", validateResource(uploadVideoSchema), videoControllers.uploadVideo);
router.post(
    "/videos/:video_id/comments",
    validateResource(videoIdSchema),
    validateResource(commentSchema),
    videoControllers.createComment
);

router.get("/videos/:video_id", validateResource(videoIdSchema), videoControllers.getVideoById);
router.get(
    "/videos/:video_id/comments",
    validateResource(videoIdSchema),
    validateResource(videoIdSchema),
    videoControllers.getComments
);

router.patch(
    "/videos/:video_id",
    verifyToken,
    validateResource(videoIdSchema),
    validateResource(updateVideoSchema),
    videoControllers.updateVideoById
);
router.patch(
    "/videos/:video_id/comments/:comment_id",
    verifyToken,
    validateResource(commentIdListSchema),
    validateResource(updateCommentSchema),
    videoControllers.updateCommentById
);

router.delete("/videos/:video_id", verifyToken, validateResource(videoIdSchema), videoControllers.deleteVideoById);
router.delete(
    "/videos/:video_id/comments/:comment_id",
    verifyToken,
    validateResource(commentIdListSchema),
    videoControllers.deleteCommentById
);

export default router;
