import express, { type Router } from "express";
import videoControllers from "../../controllers/video.controllers";
import { validateResource } from "../../middleware/validateResource";
import { videoIdSchema } from "../../schema";
import { keywordVideoSchema, updatedVideoSchema, uploadedVideoSchema } from "../../schema/video.schema";
import { commentIdListSchema, commentSchema, updatedCommentSchema } from "../../schema/comment.schema";
import { verifyToken } from "../../middleware/auth";

const router: Router = express.Router();

router.use(verifyToken);

router.post(
    "/videos/:video_id/comments",
    validateResource(videoIdSchema),
    validateResource(commentSchema),
    videoControllers.createComment
);

router.get("/videos", validateResource(keywordVideoSchema), videoControllers.getVideos);
router.get("/videos/:video_id/comments", validateResource(videoIdSchema), videoControllers.getComments);

router.patch(
    "/videos/:video_id",
    validateResource(videoIdSchema),
    validateResource(updatedVideoSchema),
    videoControllers.updateVideoById
);
router.patch(
    "/videos/:video_id/comments/:comment_id",
    validateResource(commentIdListSchema),
    validateResource(updatedCommentSchema),
    videoControllers.updateCommentById
);

router.delete(
    "/videos/:video_id/comments/:comment_id",
    validateResource(commentIdListSchema),
    videoControllers.deleteCommentById
);

export default router;
