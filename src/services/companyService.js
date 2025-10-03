import { get, patch, post } from "../utils/request";
export const getCompany = async () => {
  const result = await get("companys");
  return result;
};
export const getDetailCompany = async (id) => {
  const result = await get(`companys/${id}`);
  return result;
};
export const login = async (email, password) => {
  let pass = "";
  if (password !== "") {
    pass = `&password=${password}`;
  }
  const result = await get(`account?email=${email}${pass}`);
  return result;
};

export const checkExist = async (type, value) => {
  const result = await get(`account?${type}=${value}`);
  return result;
};

export const creatCompany = async (options) => {
  const result = await post(`account`, options);
  return result;
};

export const creatCompany1 = async (options) => {
  const result = await post(`companys`, options);
  return result;
};

export const editCompany = async (id, options) => {
  const result = await patch(`companys/${id}`, options);
  return result;
};
