import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {
    trending: [],
    saved: [],
    forYou: []
};

function audioReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.AUDIO.GET_AUDIOS:
            return {
                ...state,
                forYou: [...action.payload.audios]
            };

        default:
            return state;
    }
}

export default audioReducer;
