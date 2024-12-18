const GLOBAL_TYPES = {
    ALERT: "ALERT",
    AUTH: {
        LOGIN: "LOGIN",
        LOGOUT: "LOGOUT",
        VERIFY_TOKEN: "VERIFY_TOKEN"
    },
    USER: {
        GET_SEARCHING_USERS: "GET_SEARCHING_USERS",
        GET_HOME_USERS: "GET_HOME_USERS",
        SET_CURRENT_USER: "SET_CURRENT_USER",
        UPDATE_USER: "UPDATE_USER"
    },
    VIDEO: {
        UPLOAD_VIDEO: "UPLOAD_VIDEO",
        GET_MY_VIDEOS: "GET_MY_VIDEOS",
        GET_HOME_VIDEOS: "GET_HOME_VIDEOS",
        GET_OTHER_VIDEOS: "GET_OTHER_VIDEOS",
        GET_SEARCHING_VIDEOS: "GET_SEARCHING_VIDEOS",
        LIKE_VIDEO: "LIKE_VIDEO",
        UNLIKE_VIDEO: "UNLIKE_VIDEO",
        CREATE_COMMENT: "CREATE_COMMENT",
        GET_COMMENTS: "GET_COMMENTS",
        UPDATE_COMMENT: "UPDATE_COMMENT",
        DELETE_COMMENT: "DELETE_COMMENT"
    },
    AUDIO: {
        GET_AUDIOS: "GET_AUDIOS"
    }
};

export default GLOBAL_TYPES;
