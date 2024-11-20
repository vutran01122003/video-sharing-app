export const uploadCacheFileToCloudinary = async ({ cachePath, type }) => {
    try {
        const formData = new FormData();
        formData.append("upload_preset", "video_sharing_app");
        formData.append("file", {
            name: type === "video" ? `${Date.now()}.mp4` : `${Date.now()}.jpg`,
            uri: `file://${cachePath}`,
            type: type === "video" ? "video/mp4" : "image/jpg"
        });

        return fetch(`https://api.cloudinary.com/v1_1/dzm0nupxy/upload`, {
            method: "POST",
            body: formData
        });
    } catch (error) {
        throw error;
    }
};
