import * as VideoThumbnails from "expo-video-thumbnails";

export const replaceSpecificElement = ({ list, element }) => {
    const newList = [...list];

    for (let i = 0; i < newList.length; i++) {
        if (newList[i]._id === element._id) {
            newList[i] = element;
            break;
        }
    }

    return newList;
};

export const generateThumbnail = async (outputVideo) => {
    try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(`file://${outputVideo}`, {
            time: 15000
        });
        return uri;
    } catch (error) {
        throw error;
    }
};
