import { FFmpegKit } from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";

export const applyFilter = async ({ videoPath, filterPath, positions }) => {
    return new Promise((resolve, reject) => {
        try {
            let filterComplex = "";
            const posLength = positions.length;
            const outputPath = `${RNFS.CachesDirectoryPath}/output_${Date.now()}.mov`;

            for (let index = 0; index < posLength; index++) {
                const { timestamp, width, height, x, y } = positions[index];
                const startTime = positions[index - 1]?.timestamp || 0;
                const endTime = timestamp;
                const nextIndex = index + 1;

                filterComplex += `[1:v]scale=${width}:${height}[img${nextIndex}]; ${
                    index === 0 ? "[0:v]" : `[out${index}]`
                }[img${nextIndex}]overlay=${x}:${y}:enable='between(t,${startTime}, ${endTime})'[out${
                    nextIndex === posLength ? "" : nextIndex
                }]; `;
            }

            const command = `-i ${videoPath} -i ${filterPath} -filter_complex "${filterComplex}" -map "[out]" -c:v mpeg4 ${outputPath}`;

            FFmpegKit.execute(command).then(async (session) => {
                const returnCode = await session.getReturnCode();

                if (returnCode.isValueSuccess) {
                    RNFS.unlink(videoPath)
                        .then(() => resolve(outputPath))
                        .catch((err) => reject(err));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};
