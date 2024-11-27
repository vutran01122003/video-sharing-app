import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../utils/fetchData";
import { uploadCacheFileToCloudinary } from "../../utils/uploadFile";
import GLOBAL_TYPES from "./globalTypes";

export const uploadVideo =
    ({ videoData, videoUri, thumbnail }) =>
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
                    success: res.data?.message || "Upload video successful"
                }
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_TYPES.ALERT,
                payload: {
                    error: error.response?.data?.message || "Upload video failed"
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
                success: res.data?.message || "Get videos successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Get videos failed"
            }
        });
    }
};

export const likeVideo = (video_id, videoType) => async (dispatch) => {
    try {
        const res = await postDataApi(`/videos/${video_id}/like`);

        dispatch({
            type: GLOBAL_TYPES.VIDEO.LIKE_VIDEO,
            payload: {
                video: res.data.data,
                videoType
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data?.message || "Like video successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Like video failed"
            }
        });
    }
};

export const unlikeVideo = (video_id, videoType) => async (dispatch) => {
    try {
        const res = await postDataApi(`/videos/${video_id}/unlike`);

        dispatch({
            type: GLOBAL_TYPES.VIDEO.UNLIKE_VIDEO,
            payload: {
                video: res.data.data,
                videoType
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data?.message || "Unlike video successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Unlike video failed"
            }
        });
    }
};

export const createComment = (video_id, commentData) => async (dispatch) => {
    try {
        const res = await postDataApi(`/videos/${video_id}/comments`, commentData);

        dispatch({
            type: GLOBAL_TYPES.VIDEO.CREATE_COMMENT,
            payload: {
                video_id,
                commentData: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data.message || "Comment successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Comment failed"
            }
        });
    }
};

export const getComments = (video_id) => async (dispatch) => {
    try {
        const res = await getDataApi(`videos/${video_id}/comments`);

        dispatch({
            type: GLOBAL_TYPES.VIDEO.GET_COMMENTS,
            payload: {
                video_id,
                comments: res.data.data
            }
        });
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data?.message || "Get comment successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: error.response?.data?.message || "Get comments failed"
        });
    }
};

export const updateComment = (video_id, comment_id, content) => async (dispatch) => {
    try {
        const res = await patchDataApi(`/videos/${video_id}/comments/${comment_id}`, {
            content
        });

        dispatch({
            type: GLOBAL_TYPES.VIDEO.UPDATE_COMMENT,
            payload: {
                video_id,
                comment: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data.message || "Update comment successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Update comment failed"
            }
        });
    }
};

export const deleteComment = (video_id, comment_id) => async (dispatch) => {
    try {
        const res = await deleteDataApi(`/videos/${video_id}/comments/${comment_id}`);

        dispatch({
            type: GLOBAL_TYPES.VIDEO.DELETE_COMMENT,
            payload: {
                video_id,
                comment_id
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data.message || "Delete comment successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Delete comment failed"
            }
        });
    }
};
