import Audio, { AudioDocument } from "../models/audio.model";
import { AudioInput } from "../schema/audio.schema";

class AudioService {
    static async createAudio(audioData: AudioInput): Promise<AudioDocument> {
        try {
            const audio = await Audio.create(audioData);

            return audio.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async getAudios(): Promise<AudioDocument[]> {
        try {
            const audio = await Audio.find();

            return audio;
        } catch (error) {
            throw error;
        }
    }
}

export default AudioService;
