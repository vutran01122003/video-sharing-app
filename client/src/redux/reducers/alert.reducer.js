import GLOBAL_TYPES from "../actions/globalTypes";

export const alertReducer = (state = {}, action) => {
    switch (action.type) {
        case GLOBAL_TYPES.ALERT:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};
