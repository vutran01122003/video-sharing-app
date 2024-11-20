import GLOBAL_TYPES from "../actions/globalTypes";

const initalState = {
    myVideos: [],
    homeVideos: [],
    otherVideos: []
};

const videoReducer = (state = initalState, action) => {
    switch (action.type) {
        case GLOBAL_TYPES.VIDEO.GET_MY_VIDEOS:
            return {
                ...state,
                myVideos: [...action.payload.videos]
            };
        case GLOBAL_TYPES.VIDEO.GET_HOME_VIDEOS:
            return {
                ...state,
                homeVideos: [...action.payload.videos]
            };
        case GLOBAL_TYPES.VIDEO.GET_OTHER_VIDEOS:
            return {
                ...state,
                otherVideos: [...action.payload.videos]
            };
        case GLOBAL_TYPES.VIDEO.UPLOAD_VIDEO: {
            return {
                ...state,
                myVideos: [action.payload.video, ...state.myVideos]
            };
        }
        default:
            return state;
    }
};

export default videoReducer;
