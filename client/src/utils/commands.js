import { FFmpegKit } from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";

export const applyFilter = async ({ videoPath, filterPath, positions }) => {
    return new Promise((resolve, reject) => {
        try {
            const outputPath = `${RNFS.CachesDirectoryPath}/output_${Date.now()}.mov`;
            const pathList = [];

            let x = "";
            let y = "";
            let endBracketX = "NAN";
            let endBracketY = "NAN";

            const videoParts = [];
            const filterCommandParts = [];

            for (let index = 0; index < positions.length; index++) {
                const startTime = positions[index].timestamp;
                const endTime = positions[index + 1]?.timestamp || startTime;

                x += `if(between(t, ${startTime}, ${endTime}), ${positions[index].x}, `;
                y += `if(between(t, ${startTime}, ${endTime}), ${positions[index].y}, `;
                endBracketX += ")";
                endBracketY += ")";

                if ((index + 1) % 50 === 0 || index + 1 === positions.length) {
                    x += endBracketX;
                    y += endBracketY;

                    const length = videoParts.length;
                    const path = `${RNFS.CachesDirectoryPath}/small_video_${length}_${Date.now()}.mov`;
                    const outputPath = `${RNFS.CachesDirectoryPath}/output_${length}_${Date.now()}.mov`;

                    videoParts.push({
                        path,
                        outputPath,
                        command:
                            length === 0
                                ? `-t 00:00:${endTime} -c copy ${path}`
                                : `-ss 00:00:${videoParts[length - 1].endTime} -t 00:00:${endTime} -c copy ${path}`,
                        endTime: endTime
                    });

                    const filterCommand = `[0:v][1:v] overlay=x='${x}' :y='${y}'`;
                    filterCommandParts.push(filterCommand);

                    x = "";
                    y = "";
                    endBracketX = "";
                    endBracketY = "";
                }
            }

            const splitingCommand = `-i ${videoPath} ${videoParts.map((part) => part.command).join(" ")}`;

            FFmpegKit.execute(splitingCommand).then(async (session) => {
                const returnCode = await session.getReturnCode();

                if (returnCode.isValueSuccess) {
                    let concatContent = [];
                    let concatFilePath = `${RNFS.CachesDirectoryPath}/concat_${Date.now()}.txt`;

                    await Promise.all(
                        filterCommandParts.map((filterCommandPart, index) => {
                            const overlayingCommand = `-i ${videoParts[index].path} -i ${filterPath} -filter_complex "${filterCommandPart}" -c:a copy ${videoParts[index].outputPath}`;
                            concatContent.push(`file '${videoParts[index].outputPath}'`);
                            return FFmpegKit.execute(overlayingCommand);
                        })
                    );

                    await RNFS.writeFile(concatFilePath, concatContent.join("\n"), "utf8");

                    const mergingCommand = `-f concat -safe 0 -i ${concatFilePath} -c copy ${outputPath}`;

                    FFmpegKit.execute(mergingCommand).then(async (session) => {
                        const returnCode = await session.getReturnCode();

                        if (returnCode.isValueSuccess) {
                            RNFS.unlink(videoPath)
                                .then(() => resolve(outputPath))
                                .catch((err) => reject(err));
                        }
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};
