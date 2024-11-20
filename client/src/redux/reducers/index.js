import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import videoReducer from "./video.reducer";

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    video: videoReducer
});

export default rootReducer;
