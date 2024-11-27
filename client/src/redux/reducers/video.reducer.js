import { replaceSpecificElement } from "../../utils";
import GLOBAL_TYPES from "../actions/globalTypes";

const initalState = {
    myVideos: [],
    homeVideos: [],
    otherVideos: []
};

const videoReducer = (state = initalState, action) => {
    switch (action.type) {
        case GLOBAL_TYPES.VIDEO.GET_MY_VIDEOS: {
            return {
                ...state,
                myVideos: [...action.payload.videos]
            };
        }

        case GLOBAL_TYPES.VIDEO.GET_HOME_VIDEOS: {
            return {
                ...state,
                homeVideos: [...action.payload.videos]
            };
        }

        case GLOBAL_TYPES.VIDEO.GET_OTHER_VIDEOS: {
            return {
                ...state,
                otherVideos: [...action.payload.videos]
            };
        }

        case GLOBAL_TYPES.VIDEO.UPLOAD_VIDEO: {
            return {
                ...state,
                myVideos: [action.payload.video, ...state.myVideos]
            };
        }

        case GLOBAL_TYPES.VIDEO.LIKE_VIDEO: {
            const { video, videoType } = action.payload;

            return {
                ...state,
                [videoType]: replaceSpecificElement({ list: state[videoType], element: video })
            };
        }

        case GLOBAL_TYPES.VIDEO.UNLIKE_VIDEO: {
            const { video, videoType } = action.payload;

            return {
                ...state,
                [videoType]: replaceSpecificElement({ list: state[videoType], element: video })
            };
        }

        default:
            return state;
    }
};

export default videoReducer;
