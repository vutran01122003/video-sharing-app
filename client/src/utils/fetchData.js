import instance from "../config/axios.config";

export const postDataApi = (url, data) => {
    const res = instance.post(url, data);
    return res;
};

export const getDataApi = (url, params) => {
    const res = instance.get(url, { params });
    return res;
};

export const patchDataApi = (url, data) => {
    const res = instance.patch(url, data);
    return res;
};

export const deleteDataApi = (url, data) => {
    const res = instance.delete(url, { data });
    return res;
};
