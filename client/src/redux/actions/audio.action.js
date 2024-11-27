import GLOBAL_TYPES from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const getAudios = () => async (dispatch) => {
    try {
        const res = await getDataApi("/audios");

        dispatch({
            type: GLOBAL_TYPES.AUDIO.GET_AUDIOS,
            payload: {
                audios: res.data.data
            }
        });

        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                success: res.data?.message || "Get audio list successful"
            }
        });
    } catch (error) {
        dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {
                error: error.response?.data?.message || "Get audio list failed"
            }
        });
    }
};
