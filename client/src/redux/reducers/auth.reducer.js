import GLOBAL_TYPES from "../actions/globalTypes";

const initialState = {
    user: null,
    token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_TYPES.AUTH.LOGIN:
            const { user, token } = action.payload;

            return {
                ...state,
                user,
                token
            };

        case GLOBAL_TYPES.AUTH.VERIFY_TOKEN: {
            return {
                ...state,
                user: action.payload.user
            };
        }

        case GLOBAL_TYPES.AUTH.LOGOUT: {
            return {
                user: null,
                token: null
            };
        }

        default:
            return state;
    }
};

export default authReducer;
