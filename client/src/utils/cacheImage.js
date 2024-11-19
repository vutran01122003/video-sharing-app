import RNFS from "react-native-fs";

export const downloadImageToCache = async (imageUrl) => {
    try {
        const filename = `image_${Date.now()}.png`;
        const destPath = `${RNFS.CachesDirectoryPath}/${filename}`;

        const exists = await RNFS.exists(destPath);
        if (exists) return destPath;

        const response = await RNFS.downloadFile({
            fromUrl: imageUrl,
            toFile: destPath,
            background: true,
            discretionary: true
        }).promise;

        if (response.statusCode === 200) {
            return destPath;
        } else {
            throw new Error("Failed to download filter");
        }
    } catch (error) {
        throw error;
    }
};
