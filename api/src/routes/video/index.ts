import express, { type Router } from "express";
import videoControllers from "../../controllers/video.controllers";
import { validateResource } from "../../middleware/validateResource";
import { videoIdSchema } from "../../schema";
import { keywordVideoSchema, updatedVideoSchema, uploadedVideoSchema } from "../../schema/video.schema";
import { commentIdListSchema, commentSchema, updatedCommentSchema } from "../../schema/comment.schema";
import { verifyToken } from "../../middleware/auth";

const router: Router = express.Router();

router.post("/videos", verifyToken, validateResource(uploadedVideoSchema), videoControllers.uploadVideo);
router.post("/videos/:video_id/like", verifyToken, validateResource(videoIdSchema), videoControllers.likeVideo);
router.post("/videos/:video_id/unlike", verifyToken, validateResource(videoIdSchema), videoControllers.unlikeVideo);
router.post(
    "/videos/:video_id/comments",
    validateResource(videoIdSchema),
    validateResource(commentSchema),
    videoControllers.createComment
);

router.get("/videos", validateResource(keywordVideoSchema), videoControllers.getAllVideoByKeyword);
router.get("/videos/:video_id", verifyToken, validateResource(videoIdSchema), videoControllers.getVideoById);
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
    validateResource(updatedVideoSchema),
    videoControllers.updateVideoById
);

router.patch(
    "/videos/:video_id/comments/:comment_id",
    verifyToken,
    validateResource(commentIdListSchema),
    validateResource(updatedCommentSchema),
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
