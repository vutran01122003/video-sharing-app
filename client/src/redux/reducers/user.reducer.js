import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {
    currentUser: null,
    searchingUsers: [],
    homeUsers: []
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.USER.GET_SEARCHING_USERS: {
            return {
                ...state,
                searchingUsers: [...action.payload.users]
            };
        }

        case GLOBAL_TYPES.USER.SET_CURRENT_USER: {
            return {
                ...state,
                currentUser: action.payload.currentUser
            };
        }

        default:
            return state;
    }
}

export default userReducer;
