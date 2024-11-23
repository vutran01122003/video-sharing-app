import { replaceSpecificElement } from "../../utils";
import GLOBAL_TYPES from "../actions/globalTypes";

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case GLOBAL_TYPES.VIDEO.CREATE_COMMENT: {
            const { video_id, commentData } = action.payload;

            return {
                ...state,
                [video_id]: [commentData, ...state[video_id]]
            };
        }

        case GLOBAL_TYPES.VIDEO.GET_COMMENTS: {
            const { video_id, comments } = action.payload;

            return {
                ...state,
                [video_id]: [...comments]
            };
        }

        case GLOBAL_TYPES.VIDEO.UPDATE_COMMENT: {
            const { video_id, comment } = action.payload;

            return {
                ...state,
                [video_id]: replaceSpecificElement({ list: state[video_id], element: comment })
            };
        }

        case GLOBAL_TYPES.VIDEO.DELETE_COMMENT: {
            const { video_id, comment_id } = action.payload;

            return {
                ...state,
                [video_id]: state[video_id].filter((comment) => comment._id !== comment_id)
            };
        }

        default:
            return state;
    }
};

export default commentReducer;
