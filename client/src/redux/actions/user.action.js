import { getDataApi, patchDataApi } from "../../utils/fetchData";
import GLOBAL_TYPES from "./globalTypes";

export const getSeachingUsers = (user_name) => async (dispatch) => {
    try {
        const res = await getDataApi(`/users?user_name=${user_name}`);

        dispatch({
            type: GLOBAL_TYPES.USER.GET_SEARCHING_USERS,
            payload: {
                users: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Get users by username successfull"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Get users by username failed"
            }
        });
    }
};

export const followUser = (user_id) => async (dispatch) => {
    try {
        const res = await patchDataApi(`/users/${user_id}/follow`);
        console.log(res.data.data);
        dispatch({
            type: GLOBAL_TYPES.USER.UPDATE_USER,
            payload: {
                user: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Follow user successfull"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Follow user failed"
            }
        });
    }
};

export const unfollowUser = (user_id) => async (dispatch) => {
    try {
        const res = await patchDataApi(`/users/${user_id}/unfollow`);

        dispatch({
            type: GLOBAL_TYPES.USER.UPDATE_USER,
            payload: {
                user: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Unfollow user successfull"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Unfollow user failed"
            }
        });
    }
};
