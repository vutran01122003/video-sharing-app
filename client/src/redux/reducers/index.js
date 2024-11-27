import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import videoReducer from "./video.reducer";
import commentReducer from "./comment.reducer";
import audioReducer from "./audio.reducer";

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    video: videoReducer,
    comment: commentReducer,
    audio: audioReducer
});

export default rootReducer;
