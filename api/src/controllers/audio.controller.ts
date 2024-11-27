import { type NextFunction, type Request, type Response } from "express";
import AudioService from "../services/audio.service";
import { AudioInput } from "../schema/audio.schema";
import { AudioDocument } from "../models/audio.model";

class AudioController {
    async createAudio(req: Request<{}, {}, AudioInput>, res: Response, next: NextFunction) {
        try {
            const audioData: AudioInput = req.body;
            const audio: AudioDocument = await AudioService.createAudio(audioData);

            res.status(201).json({
                message: "Create audio successful",
                data: audio
            });
        } catch (error) {
            next(error);
        }
    }

    async getAudios(req: Request<{}, {}, AudioInput>, res: Response, next: NextFunction) {
        try {
            const audios: AudioDocument[] = await AudioService.getAudios();

            res.status(200).json({
                message: "Get audio list successful",
                data: audios
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AudioController();
