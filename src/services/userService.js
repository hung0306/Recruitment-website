import { del, get, patch, post } from "../utils/request";

export const getDetailUser = async (id) => {
    const result = await get(`account/${id}`);
    return result;
}

export const editUser = async (id, options) => {
    const result = await patch(`account/${id}`, options);
    return result
}

// ky nang
export const getSkill = async (idUser) =>{
    const result = await get(`skill?idUser=${idUser}`);
    return result;
}

export const editSkill = async (id, options) => {
    const result = await patch(`skill/${id}`, options);
    return result
}
export const deleteSkill = async (id) => {
    const result = await del(`skill/${id}`);
    return result;
}
export const createSkill = async (option) => {
    const result = await post(`skill`, option);
    return result;
}

 // hoc van
export const getEducation = async (idUser) =>{
    const result = await get(`education?idUser=${idUser}`);
    return result;
}

export const editEducation = async (id, options) => {
    const result = await patch(`education/${id}`, options);
    return result
}

export const deleteEducation = async (id) => {
    const result = await del(`education/${id}`);
    return result;
}

export const createEducation = async (option) => {
    const result = await post(`education`, option);
    return result;
}


//kinh nghiem

export const getExperience = async (idUser) =>{
    const result = await get(`experience?idUser=${idUser}`);
    return result;
}

export const editExperience= async (id, options) => {
    const result = await patch(`experience/${id}`, options);
    return result
}

export const deleteExperience = async (id) => {
    const result = await del(`experience/${id}`);
    return result;
}

export const createExperience = async (option) => {
    const result = await post(`experience`, option);
    return result;
}


//khoa hoc

export const getCourse = async (idUser) =>{
    const result = await get(`course?idUser=${idUser}`);
    return result;
}

export const editCourse= async (id, options) => {
    const result = await patch(`course/${id}`, options);
    return result
}

export const deleteCourse = async (id) => {
    const result = await del(`course/${id}`);
    return result;
}

export const createCourse = async (option) => {
    const result = await post(`course`, option);
    return result;
}

//chung chi


export const getCertificate = async (idUser) =>{
    const result = await get(`certificate?idUser=${idUser}`);
    return result;
}

export const editCertificate= async (id, options) => {
    const result = await patch(`certificate/${id}`, options);
    return result
}

export const deleteCertificate = async (id) => {
    const result = await del(`certificate/${id}`);
    return result;
}

export const createCertificate = async (option) => {
    const result = await post(`certificate`, option);
    return result;
}


//giai thuong

export const getPrize = async (idUser) =>{
    const result = await get(`prize?idUser=${idUser}`);
    return result;
}

export const editPrize= async (id, options) => {
    const result = await patch(`prize/${id}`, options);
    return result
}

export const deletePrize = async (id) => {
    const result = await del(`prize/${id}`);
    return result;
}

export const createPrize = async (option) => {
    const result = await post(`prize`, option);
    return result;
}

//du an

export const getProject = async (idUser) =>{
    const result = await get(`project?idUser=${idUser}`);
    return result;
}

export const editProject= async (id, options) => {
    const result = await patch(`project/${id}`, options);
    return result
}

export const deleteProject = async (id) => {
    const result = await del(`project/${id}`);
    return result;
}

export const createProject = async (option) => {
    const result = await post(`project`, option);
    return result;
}

//san pham


export const getProduct = async (idUser) =>{
    const result = await get(`product?idUser=${idUser}`);
    return result;
}

export const editProduct = async (id, options) => {
    const result = await patch(`product/${id}`, options);
    return result
}

export const deleteProduct  = async (id) => {
    const result = await del(`product/${id}`);
    return result;
}

export const createProduct = async (option) => {
    const result = await post(`product`, option);
    return result;
}




// hoat dong

export const getActivity = async (idUser) =>{
    const result = await get(`activity?idUser=${idUser}`);
    return result;
}

export const editActivity = async (id, options) => {
    const result = await patch(`activity/${id}`, options);
    return result
}

export const deleteActivity = async (id) => {
    const result = await del(`activity/${id}`);
    return result;
}

export const createActivity = async (option) => {
    const result = await post(`activity`, option);
    return result;
}



