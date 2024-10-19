import { del, get, patch, post } from "../utils/request";

export const createCv = async (option) => {
    const result = await post(`cv`, option);
    return result;
}
export const submitCv = async (option) => {
    const result = await post(`cvs`, option);
    return result;
}
export const getListCv = async (id) => {
    const result = await get(`cvs?idCompany=${id}`);
    return result;
}
export const getDetailCv = async (id) => {
    const result = await get(`cvs/${id}`);
    return result;
}
export const deleteCv = async (id) => {
    const result = await del(`cvs/${id}`);
    return result;
}

export const changeSttCv = async (id, options) => {
    const result = await patch(`cvs/${id}`, options);
    return result;
}


export const getListCvUser = async (id) => {
    const result = await get(`cv?idUser=${id}`);
    return result;
}

export const getDetailCvUser = async (id) => {
    const result = await get(`cv/${id}`);
    return result;
}
export const editCvUser = async (id, options) => {
    const result = await patch(`cv/${id}`, options);
    return result;
}

export const deleteCvUser = async (id) => {
    const result = await del(`cv/${id}`);
    return result
}