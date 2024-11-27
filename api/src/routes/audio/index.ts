import express, { type Router } from "express";
import { validateResource } from "../../middleware/validateResource";
import { audioSchema } from "../../schema/audio.schema";
import audioController from "../../controllers/audio.controller";
import { verifyToken } from "../../middleware/auth";

const router: Router = express.Router();

router.post("/audios", verifyToken, validateResource(audioSchema), audioController.createAudio);
router.get("/audios", verifyToken, audioController.getAudios);

export default router;
