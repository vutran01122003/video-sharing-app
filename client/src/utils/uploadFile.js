const { UPLOAD_PRESET, CLOUD_NAME } = process.env;

export const uploadCacheFileToCloudinary = async ({ cachePath, type }) => {
    try {
        const formData = new FormData();

        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("file", {
            name: type === "video" ? `${Date.now()}.mp4` : `${Date.now()}.jpg`,
            uri: `file://${cachePath}`,
            type: type === "video" ? "video/mp4" : "image/jpg"
        });

        return fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
            method: "POST",
            body: formData
        });
    } catch (error) {
        throw error;
    }
};
