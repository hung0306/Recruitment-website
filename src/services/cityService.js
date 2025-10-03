import { get } from "../utils/request";

export const getListCity = async () => {
  const result = await get("citys");
  return result;
};
