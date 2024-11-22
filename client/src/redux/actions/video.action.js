import { getDataApi, postDataApi } from "../../utils/fetchData";
import { uploadCacheFileToCloudinary } from "../../utils/uploadFile";
import GLOBAL_TYPES from "./globalTypes";

export const uploadVideo =
    ({ videoData, videoUri, thumbnail, navigation }) =>
    async (dispatch) => {
        try {
            const responses = await Promise.all([
                uploadCacheFileToCloudinary({ cachePath: videoUri, type: "video" }),
                uploadCacheFileToCloudinary({ cachePath: thumbnail, type: "image" })
            ]);

            const uploadData = await Promise.all(responses.map((response) => response.json()));

            const res = await postDataApi("/videos", {
                ...videoData,
                video_id: uploadData[0].public_id,
                video_url: uploadData[0].secure_url,
                thumbnail: uploadData[1].secure_url
            });

            dispatch({
                type: GLOBAL_TYPES.VIDEO.UPLOAD_VIDEO,
                payload: {
                    video: res.data.data
                }
            });

            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: {
                    success: res.data.message || "Upload video successfully"
                }
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: {
                    error: error.response?.data?.message || "Upload video unsuccessfully"
                }
            });
        }
    };

export const getVideoByUserId = (userId) => async (dispatch) => {
    try {
        const res = await getDataApi(`users/${userId}/videos`);

        dispatch({
            type: GLOBAL_TYPES.VIDEO.GET_MY_VIDEOS,
            payload: {
                videos: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data.message || "Get videos successfully"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Get videos unsuccessfully"
            }
        });
    }
};
